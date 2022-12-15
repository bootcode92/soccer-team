import { User } from "../entities/User";
import { EncryptionGateway } from "../gateways/EncryptionGateway";
import { IdGateway } from "../gateways/IdGateway";
import { UserRepository } from "../repositories/UserRepository";
import { Usecase } from "./Usecase";

export type SignUpInput = {
    email: string;
    password: string;
}


export class SignUp implements Usecase<SignUpInput, User> {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly idGateway: IdGateway,
        private readonly encryptionGateway: EncryptionGateway,
    ) {

    }

    async execute(input: SignUpInput): Promise<User> {
        const id = this.idGateway.generate();
        const encryptedPassword = await this.encryptionGateway.encrypt(input.password);
        const user = User.create({
            id,
            email: input.email,
            password: encryptedPassword,
        })
        await this.userRepository.save(user);
        return user;
    }
}