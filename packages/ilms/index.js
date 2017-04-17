'use strict';

const Service = require('./lib/Service');
const services = require('./lib/services');

function declare(name) {
  return new Service(name);
}

function run(serviceName, params) {
  return services[serviceName].run(params);
}

function exists(serviceName) {
  return services[serviceName] && typeof services[serviceName].run === 'function';
}

function get(serviceName) {
  return services[serviceName];
}

module.exports = {
  declare,
  exists,
  run,
  get,
};
