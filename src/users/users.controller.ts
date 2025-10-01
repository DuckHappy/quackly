import { Controller, Get, Post, Body, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return "This action returns all users";
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.username || !createUserDto.password) {
      throw new BadRequestException('No data provided');
    }
    const user = await this.userService.register(createUserDto);
    if (!user) {
      throw new BadRequestException('Email or username already exists');
    }
    return { message: 'User registered successfully', user };
    }
  
 
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.userService.login(body.email, body.password);
    if (!token) {
      throw new BadRequestException('Invalid email or password');
    }
    return { access_token: token };
  }

}