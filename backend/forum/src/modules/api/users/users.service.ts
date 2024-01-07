import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, wrap } from '@mikro-orm/core';
import { User } from './entities/User';
import { UpdateToAdminDto } from './dto/update-to-admin.dto';
import { Role } from './entities/Role';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.em.findOne(User, { id: createUserDto.id });
    if (exists) {
      throw new ConflictException('Email already registered!', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
    const count = await this.em.getRepository(User).count();
    const username = createUserDto.email.split('@')[0] + count;
    const user = this.em.create(User, {
      id: createUserDto.id,
      email: createUserDto.email,
      username: username,
      role: 1,
    });
    await this.em.persist(user).flush();
    return {
      id: user.id,
      role: user.role.id,
      username: user.username,
      email: user.email,
    };
  }

  findAll() {
    return `This action returns all users`;
  }
  async findAllAdmins() {
    return await this.em.find(
      User,
      { role: { name: 'admin' } },
      {
        populate: ['role'],
        fields: ['username', 'email', 'id', 'role'],
        orderBy: { username: 'asc' },
      },
    );
  }

  async findByUsernameOrEmail(usernameOrEmail: string) {
    return await this.em.findOne(
      User,
      {
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
      { populate: ['role'] },
    );
  }

  async updateToAdmin(updateToAdminDto: UpdateToAdminDto) {
    // UPDATE METHOD 1
    const user = await this.em.findOne(User, {
      username: updateToAdminDto.username,
    });
    if (user === null) {
      return null;
    }
    user.role = this.em.getReference(Role, 2, { wrapped: true });
    await this.em.flush();
    return user;
  }

  async demoteAdmin(uid: string) {
    // UPDATE METHOD 2
    const admin = this.em.getReference(User, uid);
    wrap(admin).assign({
      role: 1,
    });
    await this.em.flush();
    return admin;
  }
}
