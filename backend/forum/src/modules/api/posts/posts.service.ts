import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './entities/Post';
import { User } from '../users/entities/User';
import { PostLike } from './entities/PostLike';
import { Category } from '../forums/entities/Category';

@Injectable()
export class PostsService {
  constructor(private readonly em: EntityManager) {}

  // @Inject(EntityManager) private readonly em: EntityManager;

  async create(createPostDto: CreatePostDto, userId: string) {
    const user = this.em.getReference(User, userId);
    const post = this.em.create(Post, {
      user: user,
      content: createPostDto.content,
      title: createPostDto.title,
      category: createPostDto.categoryId,
      forum: createPostDto.forumId,
      createdAt: new Date(),
    });
    this.em.persist(post);
    await this.em.flush();
    return post;
  }

  async findAllByForum(id: number) {
    const posts = await this.em.find(
      Post,
      { forum: id },
      {
        populate: ['postLikes.user', 'category'],
        orderBy: { createdAt: 'desc' },
      },
    );
    await this.em.populate(posts, ['comments'], {
      fields: ['comments.createdAt'],
    });
    return posts;
  }

  async findOne(id: number) {
    return await this.em.findOne(Post, id, {
      populate: [
        'postLikes.user',
        'comments.user',
        'category',
        'user',
        'forum.categories',
      ],
      fields: [
        'user.username',
        'user.email',
        'comments',
        'category',
        'title',
        'createdAt',
        'content',
        'postLikes',
        'postLikes.user.id',
        'postLikes.user.username',
        'forum',
      ],
    });
  }

  async likePost(id: number, userId: string) {
    const like = this.em.create(PostLike, { post: id, user: userId });
    this.em.persist(like);
    await this.em.flush();
    return like;
  }

  async dislikePost(id: number, userId: string) {
    const like = await this.em.find(PostLike, { post: id, user: userId });
    this.em.remove(like);
    await this.em.flush();
    return like;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.em.findOne(Post, id);
    if (updatePostDto.categoryId === null) {
      post.category = null;
    } else {
      post.category = this.em.getReference(Category, updatePostDto.categoryId);
    }

    post.content = updatePostDto.content;
    post.title = updatePostDto.title;
    this.em.persist(post);
    await this.em.flush();
    return post;
  }

  async remove(id: number) {
    const post = this.em.getReference(Post, id);
    this.em.remove(post);
    await this.em.flush();
    return post;
  }
}
