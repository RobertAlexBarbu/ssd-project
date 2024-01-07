import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FirebaseService } from '../../modules/global/firebase/firebase.service';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../../modules/api/users/entities/User';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(
    @Inject(FirebaseService) private readonly firebaseService: FirebaseService,
    @Inject(EntityManager) private readonly em: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    if (!header) {
      return false;
    }
    const token = header.split(' ')[1];
    if (!token) {
      return false;
    }
    const auth = this.firebaseService.getAuth();
    try {
      const data = await auth.verifyIdToken(token);
      request.user = await this.em.findOne(User, { id: data.uid });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
