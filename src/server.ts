import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import bcrypt from 'bcryptjs';
import { authRoutes } from './routes/auth.routes';
import fastifyCookie from '@fastify/cookie';

import { userRoutes } from './routes/user.routes';
import {universityRoutes} from './routes/university.routes';
import { postRoutes } from './routes/post.routes';
import {comentarioRoutes} from './routes/comment.routes';
import { curtidaRoutes } from './routes/like.routes';
import { grupoApoioRoutes } from './routes/grupoApoio.routes';
import { participacaoGrupoRoutes } from './routes/groupParticipation.routes';
import { recursoRoutes } from './routes/resource.routes';
import { acessoRecursoRoutes } from './routes/resourceAccess.routes';
import { contatoEmergenciaRoutes } from './routes/contactEmergency.routes';
import { alertaEmergenciaRoutes } from './routes/alertEmergency.routes';
import { contatoConfiancaRoutes } from './routes/contactTrust.routes';


const app = Fastify();

// Registra fastify-cookie
app.register(fastifyCookie);

// 🔐 Configurar JWT antes de carregar as rotas
// app.register(fastifyJwt, {
//   secret: 'super_secret_key', // Use uma chave forte e segura
// });

app.register(fastifyJwt, {
  secret: 'super_secret_key',
  cookie: {
    cookieName: 'token', // Diz ao Fastify para buscar JWT nos cookies
    signed: false
  }
});

// Registrar a rota de autenticação (Login)
app.register(authRoutes);

// Exemplo de registro global de autenticação para rotas protegidas:
app.addHook('preHandler', async (request, reply) => {
  // Se a rota for pública (exemplo: login), não verifica o token
  if (request.routeOptions?.url === '/login') {
    return;
  }

  try {
    const token = request.cookies.token; // Obtém o token do cookie
    if (!token) {
      throw new Error('Token não fornecido');
    }

    await request.jwtVerify(); // Fastify JWT verifica automaticamente

  } catch (err) {
    return reply.code(401).send({ message: 'Token inválido ou não fornecido' });
  }
});



app.register(userRoutes, {
  prefix: '/users',
});

app.register(universityRoutes, { 
  prefix: '/university' });

app.register(postRoutes, {
  prefix: '/posts',
});

app.register(curtidaRoutes, { 
  prefix: '/curtidas' 
});

app.register(comentarioRoutes, { prefix: '/comentarios' });

app.register(grupoApoioRoutes, {
  prefix: '/grupos-apoio'
});

app.register(participacaoGrupoRoutes, { prefix: '/participacao-grupo' });

app.register(recursoRoutes, {
  prefix: '/recursos'
})

app.register(acessoRecursoRoutes, { prefix: '/acessos-recursos' });

app.register(contatoEmergenciaRoutes, { prefix: '/contatos-emergencia' });

app.register(contatoConfiancaRoutes, { prefix: '/contatos-confianca' });

app.register(alertaEmergenciaRoutes, { prefix: '/alertas-emergencia' });



app.listen({ port: 3100 }, () => {
  console.log('Server listening on port 3100');
});


