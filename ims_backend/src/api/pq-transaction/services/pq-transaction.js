'use strict';

/**
 * pq-transaction service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pq-transaction.pq-transaction');
