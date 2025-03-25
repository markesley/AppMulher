import Fastify from 'fastify';

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


