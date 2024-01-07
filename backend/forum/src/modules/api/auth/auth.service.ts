import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../users/entities/User';
import { AuthStateModel } from './auth-state.model';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager) {}
  async login(id: string) {
    const user = await this.em.findOne(User, { id: id });
    if (!user) {
      throw new BadRequestException('Account not registered. Please sign up');
    }
    const authState: AuthStateModel = {
      username: user.username,
      id: user.id,
      role: user.role.id,
      email: user.email,
    };
    return authState;
  }
}
