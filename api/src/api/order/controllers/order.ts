"use strict";
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    try {
      // Create Stripe line items by fetching product details for each product in the request
      const lineItems = await Promise.all(
        products?.map(async (product) => {
          const response = await strapi
            .service("api::product.product")
            .findOne(product.id);
          
          // Unwrap the product data.
          // If response.data exists, check for attributes; otherwise, use response.data directly.
          const item = response?.data ? ( response.data) : response;
          
          // Check if title and price exist
          if (!item || !item.title || !item.price) {
            throw new Error(`Product data is missing for ID ${product.id}`);
          }
          
          return {
            price_data: {
              currency: "eur", // Use "eur" instead of "euro"
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity || 1,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["DE"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "?success=false",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      console.error("Order creation error:", error);
      ctx.response.status = 500;
      return { error: error.message };
    }
  },
}));
