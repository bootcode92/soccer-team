import {ResetPassword} from "../usecases/ResetPassword";
import {InMemoryUserRepository} from "./adapters/repositories/InMemoryUserRepository";
import {User} from "../entities/User";
import {UuidGateway} from "./adapters/gateways/UuidGateway";


const db = new Map();

const userRepository = new InMemoryUserRepository(db);
const idGateway = new UuidGateway();


const resetPassword = new ResetPassword(userRepository)

describe('Unit - ResetPassword', () => {
    let userId: string;


    beforeAll(() => {
        userId = idGateway.generate();
        db.set(userId, new User({
            id: userId,
            email: "hello@yopmail.com",
            password: "123456",
            recoveryCode: "test123"
        }))
    })

    it('Should reset password', async () => {
        await resetPassword.execute({
            uid: userId,
            password: "nouveau mot de passe",
            recoveryCode: "test123",
        })
        const user = await userRepository.getById(userId);
        expect(user.props.password).toEqual("nouveau mot de passe")

    })
})