import fastify from 'fastify';

import auth, { FastifyBasicAuthOptions } from '@fastify/basic-auth';

const server = fastify();

const validate: FastifyBasicAuthOptions['validate'] = async (
  username,
  password,
  req,
  reply,
  done,
) => {
  if (username !== 'admin' || password !== 'admin123') return new Error();
};

server.register(auth, {
  validate,
  authenticate: true,
});

server.after(() => {
  server.addHook('onRequest', server.basicAuth);

  server.get('/', async (req, reply) => {
    return { hello: 'world' };
  });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
