import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { RolesGuard } from 'src/auth/roles-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AddRoleDto } from './dtos/add-role.dto';
import { BanUserDto } from './dtos/dan-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (private userService: UsersService) {}

  @ApiOperation({summary: "Createing of user"})
  @ApiOkResponse({type: User})
  // @UsePipes(ValidationPipe) // u can use local pipes and global ones
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  } 

  @ApiOperation({summary: "Get all users"})
  @ApiOkResponse({type: [User]})

  //todo: create enum
  @Roles('USER')
  @UseGuards(RolesGuard)
  // todo: realize this but withour repeating of code
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({summary: "Add a role to a user"})
  @ApiOkResponse({type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() dto: AddRoleDto) {
   return this.userService.addRole(dto)
  }

  @ApiOperation({summary: "Ban a user"})
  @ApiOkResponse({type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  ban(@Body() dto: BanUserDto) {
   return this.userService.ban(dto)
  }
}
