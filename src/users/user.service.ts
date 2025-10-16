import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/database/postgres/repositories/users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private userRepository: UsersRepository) {}
    async register(createUserDto:CreateUserDto){
        const {email, username, password} = createUserDto;
        const users = await this.userRepository.findAll();
        //Valida si el email ya existe
        const exists = users.find((u) => u.email === email);
        if(exists) return null;
        //Valida si el username ya existe
        const usernameExists = users.find((u) => u.username === username);
        if(usernameExists) return null;
        //Hash de la contraseña
        const hash = await bcrypt.hash(password, 10);
        await this.userRepository.create({
            email,
            username,
            password: hash,
        });
        return {email, username};
    }
     async login(email:string, password:string): Promise<string | null>{
        const user = await this.userRepository.findByEmail(email);
        if(!user) return null;
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return null;
        //Generar token JWT
        const token = jwt.sign(
            {email: user.email, username: user.username, id: user.id},
            process.env.JWT_SECRET || 'secret', // Clave secreta
            { expiresIn: '1h' } // Opcional: tiempo de expiración
        );
        return token;
    }

    async findById(id:number){ //encontrar por id
        return this.userRepository.findById(id); //devuelve el id encontrado de userRepository
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

}