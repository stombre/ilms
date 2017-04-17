'use strict';

const servicesIndex = require('./services');

function runService(service, params) {
  return new Promise((resolve, reject) => {
    runMiddleware({
      service,
      resolve,
      reject,
      params,
      middlewareIndex: 0,
    });
  });
}

function runMiddleware({ service, resolve, reject, params, middlewareIndex, }) {
  if (typeof service.middlewares[middlewareIndex] === 'undefined') {
    return resolve(params);
  }

  const next = params => {
    next.called = true;

    return runMiddleware({
      service,
      resolve,
      reject,
      params,
      middlewareIndex: middlewareIndex + 1,
    });
  };

  next.called = false;

  next.resolve = param => {
    next.called = true;

    return resolve(param);
  };

  next.reject = error => {
    next.called = true;

    return reject(error);
  };

  next.replay = params => runMiddleware({
    service,
    resolve,
    reject,
    params,
    middlewareIndex,
  });

  next.run = (name, params) => runService(servicesIndex[name], params);

  const result = service.middlewares[middlewareIndex](params, next);

  const resultPromise = result instanceof Promise ? result : Promise.resolve(result);

  return resultPromise
    .then(result => {
      if (!next.called) {
        return next(result);
      }

      return result;
    });
}

module.exports = runService;
