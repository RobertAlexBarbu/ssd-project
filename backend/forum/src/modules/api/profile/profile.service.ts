import { Injectable } from '@nestjs/common';
import { EntityManager, serialize } from '@mikro-orm/core';
import { User } from '../users/entities/User';

import { Post } from '../posts/entities/Post';

@Injectable()
export class ProfileService {
  constructor(private readonly em: EntityManager) {}

  async findOne(username: string) {
    const user = await this.em.findOne(
      User,
      { username: username },
      { populate: ['role'] },
    );
    const serializedUser = serialize(user, {
      forceObject: true,
      skipNull: false,
    });
    const posts = await this.em.find(
      Post,
      { user: { username: username } },
      { populate: ['forum', 'postLikes', 'comments', 'user', 'category'] },
    );

    return { user: serializedUser, posts };
  }
}
