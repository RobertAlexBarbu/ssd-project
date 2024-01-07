import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from '../../modules/api/posts/entities/Post';

@Injectable()
export class CanEditPostGuard implements CanActivate {
  constructor(@Inject(EntityManager) private em: EntityManager) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params['id'];
    const postUser = await this.em.findOne(Post, { id: postId });
    return postUser.user.id === request.user.id;
  }
}
