import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptoService } from '../../global/crypto/crypto.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseMiddleware } from '../../../shared/middleware/firebase.middleware';

@Module({
  controllers: [UsersController],
  imports: [ConfigModule],
  providers: [UsersService, CryptoService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware).forRoutes({
      path: 'api/users',
      method: RequestMethod.POST,
    });
  }
}
