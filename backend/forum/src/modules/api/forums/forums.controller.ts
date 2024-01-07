import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ForumsService } from './forums.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';
import { FirebaseGuard } from '../../../shared/guards/firebase.guard';

@Controller('api/forums')
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @Post()
  @UseGuards(FirebaseGuard, IsAdminGuard)
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumsService.create(createForumDto);
  }

  @Get()
  findAll() {
    return this.forumsService.findAll();
  }

  @Get('trending')
  findTrending() {
    return this.forumsService.findTrending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumsService.findOne(+id);
  }

  @Get('edit/:id')
  findOneForEdit(@Param('id') id: string) {
    return this.forumsService.findOneForEdit(+id);
  }

  @Put(':id')
  @UseGuards(FirebaseGuard, IsAdminGuard)
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumsService.update(+id, updateForumDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.forumsService.remove(+id);
  }
}
