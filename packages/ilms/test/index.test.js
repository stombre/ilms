/*eslint-disable */
'use strict';

const ilms = require('../index');
const { expect, } = require('chai');

describe('Acceptance test', () => {
  it('Should work as a middleware', done => {


    const testMiddleware = (params, next) => {
      next(params + 1);
    };

    ilms.declare('myMiddleware')
      .use(testMiddleware)
      .use(testMiddleware)
      .run(4)
      .then( result => {
        expect(result).to.be.equal(6);

        done();
      })
      .catch(done);

  });

  it('Should use next to run a service or to replay a middleware', done => {

    const sumMiddleware = (params, next) => {
      next(params.a + params.b);
    };

    const calculationMiddleware = (params, next) => {
      if(!params.b) {
        params.b = 10;

        return next.replay(params);
      }

      return next.run('sum', params);
    };

    ilms.declare('sum')
      .use(sumMiddleware);

    ilms.declare('test')
      .use(calculationMiddleware);

    ilms.run('test', { a: 30 })
      .then(result => {
        expect(result).to.be.equal(40);

        done();
      })
      .catch(done);

  });
});