'use strict';

const HTTP_CODE = {
  OK: 200,
  CREATED: 201,

  NOT_FOUND: 404,

  SERVER_ERROR: 500,
};


function expressMiddleware(service) {
  function middleware(request, response) {
    const params = Object.assign({}, request.query, request.body, request.params);
    const is201 = request.method === 'POST';

    service.run(params)
      .then(results => {
        if (!results) {
          response.status(HTTP_CODE.NOT_FOUND).json({
            error: 'NOT_FOUND',
          });
        }

        const statusCode = is201 ? HTTP_CODE.CREATED : HTTP_CODE.OK;

        response.status(statusCode).json(results);
      })
      .catch(err => {
        response.status(HTTP_CODE.SERVER_ERROR).json(err);
      });
  }

  return middleware;
}

module.exports = expressMiddleware;
