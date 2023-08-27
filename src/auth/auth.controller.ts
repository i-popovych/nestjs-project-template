import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: "Registration of a user"})
  @ApiResponse({status: 200, description: "The authorization token will be returned"})
  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @ApiOperation({summary: "Login of a user"})
  @ApiResponse({status: 200, description: "The authorization token will be returned"})
  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

}
