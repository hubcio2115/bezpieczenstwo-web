import express from 'express';
// @ts-ignore
import { NodeAdapter } from 'ef-keycloak-connect';
import config from './config.json' assert { type: 'json' };

const server = express();

const keycloak = new NodeAdapter(config);
server.use(keycloak.middleware());

server.get('/hello', keycloak.protect(), (req, res) => {
  res.status(200).send('Hello World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
