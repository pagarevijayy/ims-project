'use strict';

/**
 * pq-transaction router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pq-transaction.pq-transaction');
