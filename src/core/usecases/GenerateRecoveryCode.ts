import {Usecase} from "./Usecase";
import {UserRepository} from "../repositories/UserRepository";
import {IdGateway} from "../gateways/IdGateway";
import {User} from "../entities/User";

export type GenerateRecoveryCodeInput = {
    email: string;
}

export class GenerateRecoveryCode implements Usecase<GenerateRecoveryCodeInput, User> {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly idGateway: IdGateway,
    ) {}

    async execute(input: GenerateRecoveryCodeInput): Promise<User> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        const code = this.idGateway.generate();
        // generate recovery code.
        user.generateRecoveryCode(code);
        await this.userRepository.save(user);
        return user;
    }
}