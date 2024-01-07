import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateToAdminDto } from './dto/update-to-admin.dto';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';
import { FirebaseGuard } from '../../../shared/guards/firebase.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('admins')
  @UseGuards(FirebaseGuard, IsAdminGuard)
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  @Post('admins')
  @UseGuards(FirebaseGuard, IsAdminGuard)
  updateToAdmin(@Body() updateToAdminDto: UpdateToAdminDto) {
    return this.usersService.updateToAdmin(updateToAdminDto);
  }
  @Put('admins/:id')
  @UseGuards(FirebaseGuard, IsAdminGuard)
  demoteAdmin(@Param('id') id: string) {
    return this.usersService.demoteAdmin(id);
  }
}
