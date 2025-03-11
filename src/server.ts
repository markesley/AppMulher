import Fastify from 'fastify';

import { userRoutes } from './routes/user.routes';
const app = Fastify();

app.register(userRoutes, {
  prefix: '/users',
});


app.listen({ port: 3100 }, () => {
  console.log('Server listening on port 3100');
});