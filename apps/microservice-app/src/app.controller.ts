import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  @Get()
  async getUser() {
    return this.userService.send(
      {
        cmd: 'get-user',
      },
      {}
    );
  }
}
