import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { GetRoleQuery } from './types/get-role-query.type';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: "Add new role to the database"})
  @ApiOkResponse({type: Role})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto)
  }

  @ApiOperation({summary: "Get a role from form the database by name"})
  @ApiOkResponse({type: Role})
  @Get('/:value')
  getByValue(@Param('value') params: GetRoleQuery) {
      return this.rolesService.getRoleByValue(params.value)
  }
}
