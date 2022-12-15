import {Usecase} from "./Usecase";
import {UserRepository} from "../repositories/UserRepository";


export type ResetPasswordInput = {
    uid: string;
    password: string;
    recoveryCode: string;
}

export class ResetPassword implements Usecase<ResetPasswordInput, void> {
    constructor(
        private readonly userRepository: UserRepository
    ) {
    }

    async execute(input: ResetPasswordInput): Promise<void> {
        const user = await this.userRepository.getById(input.uid);
        user.resetPassword({
            code: input.recoveryCode,
            password: input.password,
        });
        await this.userRepository.save(user);
        return;
    }
}