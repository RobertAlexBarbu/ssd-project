import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginOpenerPolicy: false, // for sign in pop up to work
      originAgentCluster: false,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:4200', 'https://forumly.xyz', 'https://www.forumly.xyz'],
    credentials: true,
  });

  // const options = {
  //   dotfiles: 'ignore',
  //   etag: false,
  //   extensions: ['html', 'js', 'scss', 'css'],
  //   index: false,
  //   maxAge: '1y',
  //   redirect: true,
  // }
  // app.use('', (req, res, next) => {
  //   res.setHeader("Origin-Agent-Cluster", "false");
  //   next();
  // })
  // app.use((req, res, next) => {
  //   res.header("Cross-Origin-Embedder-Policy", "cross-origin")
  //   next()
  // })

  // {
  //   directives: {
  //     defaultSrc: ["self", "64.226.108.248"],
  //       connectSrc: ["'self'", '*.googleapis.com', '157.230.108.218'],
  //       imgSrc: ["'self'", '*.googleapis.com', 'data: blob:'],
  //       scriptSrcElem: ["'self'", 'apis.google.com'],
  //       frameSrc: ["'self'", '*.firebaseapp.com']
  //   }
  // },
  await app.listen(3000);
}
bootstrap();
