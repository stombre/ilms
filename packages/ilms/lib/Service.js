'use strict';

const runService = require('./runService');
const services = require('./services');

class Service {
  constructor(name) {
    services[name] = this;
    this.fields = [];
    this.options = [];
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);

    return this;
  }

  bind(serviceName) {
    this.middlewares.push(services[serviceName].run);

    return this;
  }

  run(params) {
    return runService(this, params);
  }

}

module.exports = Service;
