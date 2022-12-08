'use strict';

/**
 * master-transaction router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::master-transaction.master-transaction');
