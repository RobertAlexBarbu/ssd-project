import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { EntityManager } from '@mikro-orm/core';
import { Forum } from './entities/Forum';
import { Category } from './entities/Category';
import { Post } from '../posts/entities/Post';
import { Comment } from '../comments/entities/Comment';

@Injectable()
export class ForumsService {
  constructor(private readonly em: EntityManager) {}

  async create(createForumDto: CreateForumDto) {
    const forum = this.em.create(Forum, createForumDto);
    await this.em.persist(forum).flush();
    return forum;
  }

  async findAll() {
    const forums = await this.em.find(
      Forum,
      {},
      { populate: ['categories'], orderBy: { name: 'asc' } },
    );
    await this.em.populate(forums, ['posts.createdAt'], {
      fields: ['posts.createdAt'],
    });
    return forums;
  }
  async findTrending() {
    const latestPosts = await this.em.find(
      Post,
      {},
      {
        populate: ['postLikes.user', 'category', 'comments', 'user', 'forum'],
        orderBy: { createdAt: 'desc' },
        limit: 3,
      },
    );
    const latestComments = await this.em.find(
      Comment,
      {},
      {
        populate: ['user', 'post.forum'],
        orderBy: { createdAt: 'desc' },
        limit: 3,
      },
    );
    return { latestPosts, latestComments };
  }

  async findOne(id: number) {
    return await this.em.findOne(
      Forum,
      { id: id },
      {
        populate: [
          'categories',
          'posts',
          'posts.postLikes',
          'posts.category',
          'posts.forum',
          'posts.user',
          'posts.comments',
        ],
      },
    );
  }
  async findOneForEdit(id: number) {
    return await this.em.findOne(
      Forum,
      { id: id },
      { populate: ['categories'] },
    );
  }

  async update(id: number, updateForumDto: UpdateForumDto) {
    const forum = this.em.getReference(Forum, id);
    updateForumDto.deletedCategories.forEach((c) => {
      const category = this.em.getReference(Category, c.id);
      this.em.remove(category);
    });
    updateForumDto.addedCategories.forEach((c) => {
      const category = this.em.create(Category, c);
      category.forum = forum;
      this.em.persist(category);
    });
    forum.name = updateForumDto.name;
    await this.em.flush();
    return forum;
  }

  async remove(id: number) {
    const ref = this.em.getReference(Forum, id);
    this.em.remove(ref);
    await this.em.flush();
    return ref;
  }
}
