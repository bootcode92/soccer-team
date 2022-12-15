import { User } from "../../../entities/User";
import { UserRepository } from "../../../repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {

    constructor(
        private readonly db: Map<string, User>
    ) {}

    async save(user: User): Promise<User> {
        this.db.set(user.props.id, user);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const values = Array.from(this.db.values());
        return values.find(item => item.props.email === email);
    }

    async getById(id: string): Promise<User> {
        const user = this.db.get(id);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        return user;
    }
}