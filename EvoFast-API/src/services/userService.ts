import { UserRepository } from '../repositories/userRepository';


export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async auth(name: string, email: string,password:string,googleId:string) {
    if (!isValidName(name)) {
      throw new Error('Nome inválido');
    }
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!isValidPassword(password)) {
      throw new Error('Senha inválida');
    }
    const user = await this.userRepository.addUser(name, email, passwordHash, googleId);
    return user;
  }

}