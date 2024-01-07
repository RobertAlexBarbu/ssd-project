import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/api/users/users.module';
import { defineConfig } from '@mikro-orm/postgresql';
import { Post } from './modules/api/posts/entities/Post';
import { User } from './modules/api/users/entities/User';
import { Role } from './modules/api/users/entities/Role';
import { CryptoService } from './modules/global/crypto/crypto.service';
import { AuthModule } from './modules/api/auth/auth.module';
import { ForumsModule } from './modules/api/forums/forums.module';
import { Category } from './modules/api/forums/entities/Category';
import { Forum } from './modules/api/forums/entities/Forum';
import { PostsModule } from './modules/api/posts/posts.module';
import { CommentsModule } from './modules/api/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './modules/global/firebase/firebase.module';
import { ProfileModule } from './modules/api/profile/profile.module';
import { EmailModule } from './modules/global/email/email.module';
import { PostLike } from './modules/api/posts/entities/PostLike';
import { Comment } from './modules/api/comments/entities/Comment';
import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(
      defineConfig({
        entities: [Post, PostLike, User, Role, Category, Forum, Comment],
        clientUrl: process.env.DATABASE_URL,
        forceUtcTimezone: true,
        driverOptions: {
          connection: {
            ssl: {
              ca: fs
                .readFileSync(
                  path.join(__dirname, '..', '..', '.ca-certificate.crt'),
                )
                .toString(),
            },
          },
        },
      }),
    ),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'client', 'dist', 'forum-app'),
      exclude: ['/api/(.*)'],
    }),
    UsersModule,
    AuthModule,
    ForumsModule,
    PostsModule,
    ProfileModule,
    CommentsModule,
    FirebaseModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {
  constructor() {}
}
