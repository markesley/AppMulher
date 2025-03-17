import Fastify from 'fastify';

import { userRoutes } from './routes/user.routes';
import {universityRoutes} from './routes/university.routes';
import { postRoutes } from './routes/post.routes';
import {comentarioRoutes} from './routes/comment.routes';

const app = Fastify();

app.register(userRoutes, {
  prefix: '/users',
});

app.register(universityRoutes, { 
  prefix: '/university' });

app.register(postRoutes, {
  prefix: '/posts',
});

app.register(comentarioRoutes, { prefix: '/comentarios' });


app.listen({ port: 3100 }, () => {
  console.log('Server listening on port 3100');
});