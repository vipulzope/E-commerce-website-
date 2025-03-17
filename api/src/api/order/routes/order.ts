/**
 * order router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order.order');

module.exports = {
    routes: [
      {
        method: "POST",
        path: "/orders",
        handler: "order.create",
        config: {
          policies: [],
        },
      },
    ],
  };
  