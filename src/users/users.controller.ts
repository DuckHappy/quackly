import { Controller, Get, Post, Body, BadRequestException, Param, NotFoundException } from "@nestjs/common";
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

  @Get(':id') //uso metodo para crear endpoint id
  async getUserById(@Param('id') id: string) { // obtiene parametro en esta caso id y lo guarda en variable id
    const user = await this.userService.findById(+id); // encontrar usuario por id usando userService
    if (!user) { // si el usuario no existe
      throw new NotFoundException('User not found'); // muestra mensaje 'User not found'
    }
    const { password, ...userWithoutPassword } = user; // extrae la contraseña del usuario
    return userWithoutPassword; // devuelve el usuario encontrado sin la contraseña
  }

}