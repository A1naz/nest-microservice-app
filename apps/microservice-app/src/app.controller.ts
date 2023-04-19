import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  HttpException,
  HttpStatus,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { newUserDto } from './dto/new-user.dto';
import { newProfileDto } from './dto/new-profile.dto';
import { profileDto } from 'apps/profile/dto/profile.dto';
import { AuthGuard } from './guards/auth.guard';
import { UpdateGuard } from './guards/update.guard';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('PROFILE_SERVICE') private profileService: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUsers() {
    return this.userService.send(
      {
        cmd: 'get-user',
      },
      {}
    );
  }

  @Post('/user')
  async createUser(@Body() data: newUserDto) {
    return this.userService.send(
      {
        cmd: 'create-user',
      },
      data
    );
  }

  @UseGuards(AuthGuard, UpdateGuard)
  @Put('/user')
  async updateUser(@Body() data: newUserDto) {
    return this.userService.send(
      {
        cmd: 'update-user',
      },
      data
    );
  }

  @UseGuards(AuthGuard, UpdateGuard)
  @Delete('/user/:userId')
  async deleteUser(@Param('userId') userId: number) {
    const id = +userId;
    console.log(id);

    return this.userService.send(
      {
        cmd: 'delete-user',
      },
      { idUser: id }
    );
  }

  @UseGuards(AuthGuard)
  @Get('/user/:userId')
  async getOneUser(@Param('userId') userId: number) {
    const id = +userId;

    return this.userService.send(
      {
        cmd: 'get-one-user',
      },
      { idUser: id }
    );
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfiles() {
    return this.profileService.send(
      {
        cmd: 'get-profile',
      },
      {}
    );
  }

  @UseGuards(AuthGuard)
  @Post('/profile')
  async createProfile(@Body() data: newProfileDto) {
    return this.profileService.send(
      {
        cmd: 'create-profile',
      },
      data
    );
  }

  @UseGuards(AuthGuard, UpdateGuard)
  @Put('/profile')
  async updateProfile(@Body() data: profileDto) {
    return this.profileService.send(
      {
        cmd: 'update-profile',
      },
      data
    );
  }

  @UseGuards(AuthGuard, UpdateGuard)
  @Delete('/profile/:userId')
  async deleteProfile(@Param('userId') userId: number) {
    const id = +userId;
    console.log(id);

    return this.profileService.send(
      {
        cmd: 'delete-profile',
      },
      { idUser: id }
    );
  }

  @UseGuards(AuthGuard)
  @Get('/profile/:userId')
  async getOneProfile(@Param('userId') userId: number) {
    const id = +userId;

    return this.profileService.send(
      {
        cmd: 'get-one-profile',
      },
      { idUser: id }
    );
  }

  @Post('/auth')
  loging(@Body() user: newUserDto) {
    return this.userService.send({ cmd: 'login' }, user);
  }
}
