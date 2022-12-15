import { User } from "../entities/User";

export interface UserRepository {
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User>;
    getById(id: string): Promise<User>;
}