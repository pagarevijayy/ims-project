'use strict';

/**
 * master-transaction service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::master-transaction.master-transaction');
