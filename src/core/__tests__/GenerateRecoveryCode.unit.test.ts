import {InMemoryUserRepository} from "./adapters/repositories/InMemoryUserRepository";
import {UuidGateway} from "./adapters/gateways/UuidGateway";
import {GenerateRecoveryCode} from "../usecases/GenerateRecoveryCode";
import {User} from "../entities/User";

const db = new Map();

const userRepository = new InMemoryUserRepository(db);
const idGateway = new UuidGateway();


const generateRecoveryCode = new GenerateRecoveryCode(userRepository, idGateway);

describe('Unit - GenerateRecoveryCode', () => {

    beforeAll(() => {
        const userId = idGateway.generate();
        db.set(userId, User.create({
            id: userId,
            email: "hello@yopmail.com",
            password: "123456"
        }))
    })

    it('Should generate a recovery code', async () => {
        await generateRecoveryCode.execute({
            email: "hello@yopmail.com"
        })
        const user = await userRepository.findByEmail("hello@yopmail.com");
        expect(user.props.recoveryCode).toBeTruthy();
    })
})