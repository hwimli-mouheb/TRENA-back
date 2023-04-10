import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';
import { NewUserDTO } from './dtos/new-user.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get()
  getUsers(): Promise<any> {
    return this.userService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@User() user: UserDetails): UserDetails {
    return user;
  }

  //protect route with jwt token
  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createUser(
    @User() user,
    @Body() createUserDTO: NewUserDTO,
  ): Promise<any> {
    return this.userService.register(createUserDTO);
  }
  @UseGuards(JwtGuard)
  @Delete(':userEmail')
  async deleteUser(
    @User() user,
    @Param('userEmail') userEmail: string,
  ): Promise<any> {
    return this.userService.deleteUser(user, userEmail);
  }
}
