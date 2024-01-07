import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CryptoService } from '../../global/crypto/crypto.service';
import { FirebaseMiddleware } from '../../../shared/middleware/firebase.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule],
  providers: [AuthService, CryptoService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirebaseMiddleware).forRoutes({
      path: 'api/auth/login',
      method: RequestMethod.POST,
    });
  }
}
