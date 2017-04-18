# ilms-express

See ilms project to understand the microservice way.

ilms-express it's a factory which build an express route handler from a ilms service


## Example

```javascript 
const ilms = require('ilms');
const ilmsExpress = require('ilms-express');

const ilmsService = ilms.get('users.get');

const expressHandler = ilmsExpress(ilmsService);

app.get('/users', expressHandler);


```

## API