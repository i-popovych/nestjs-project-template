import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';
import { AddRoleDto } from './dtos/add-role.dto';
import { BanUserDto } from './dtos/dan-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const isUserExist = await this.getUserByEmail(dto.email);
    if (isUserExist) {
      throw new BadRequestException('User is already exist')
    }
    const user = await this.userRepository.create(dto)
    const role = await this.rolesService.getRoleByValue("USER")
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}})
    return users
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: [Role]})
    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.value)

    if (role && user) {
      await user.$add('roles', role.id)
      return dto;
    }

    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (!user) 
      throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND)
    

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save()
    return user;
  }
}
