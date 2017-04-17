# I :heart: MicroService (ilms)
Project to build better microservices


## What is a service ?
A service is a group of middleware.
A middleware is a handler which, with a given input give a output ;

* basic example 
```javascript

const ilms = require('ilms');

const sum = (params, next) => {
  next(params.a + params.b);
};

ilms('sum')
    .use(sum)
    .play({ a : 5, b: 4 })
    .then(result => {
      expect(result).to.be.equal(9);
    });

```

* multiple middlewares in one service :
```javascript
const ilms = require('ilms');

const registerUserMongoDB = require('./registerUserMongoDB');
const registerUserElasticSearch = require('./registerUserElasticSearch');
const triggerCRM = require('./triggerCRM');

ilms('users.register')
    .use(registerUserMongoDB)
    .use(registerUserElasticSearch)
    .use(triggerCRM);
```

## Why ?
This kind of code is easier to test, it give a good base to create framework.

## API
### API - ilms
- ilms.declare(serviceName) : Create a new service from serviceName.
- ilms.exists(serviceName) : Check if the given service exists
- ilms.run(serviceName, params) : Play a service with the given params.
- ilms.get(serviceName) : Get the service serviceName

### API - Service
- Service.use(middleware) : Associate a middleware to the given service.
- Service.bind(serviceName) : Associate the current service with another service
- Service.run(params) : Play the service and return a promise with the result.

### API - next

- next(results) : go to the next middleware in the stack or resolve middleware stack
- next.resolve(results) : resolve the middleware stack
- next.reject(err) : reject the middleware stack
- next.replay(params) : replay the same middleware with the params
- next.run(serviceName, params) : play another service (return a promise)

