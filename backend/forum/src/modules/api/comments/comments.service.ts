import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EntityManager, serialize } from '@mikro-orm/core';
import { Comment } from './entities/Comment';
import { EmailService } from '../../global/email/email.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly em: EntityManager,
    private readonly emailService: EmailService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    username: string,
  ) {
    const commentsCount = await this.em
      .getRepository(Comment)
      .count({ post: createCommentDto.postId });
    if (commentsCount === 0) {
      this.emailService
        .sendMail({
          fromName: username,
          toName: createCommentDto.username,
          message: createCommentDto.content,
          toEmail: createCommentDto.userEmail,
          postName: createCommentDto.postName,
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const post = this.em.create(Comment, {
      user: userId,
      post: createCommentDto.postId,
      content: createCommentDto.content,
    });
    this.em.persist(post);
    await this.em.flush();
    return serialize(post, {
      forceObject: true,
    });
  }

  async remove(id: number) {
    const comment = this.em.getReference(Comment, id);
    this.em.remove(comment);
    await this.em.flush();
    return comment;
  }
}
