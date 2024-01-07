import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';
import { FirebaseGuard } from '../../../shared/guards/firebase.guard';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(FirebaseGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.create(
      createCommentDto,
      req.user.id,
      req.user.username,
    );
  }

  @Delete(':id')
  @UseGuards(FirebaseGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
