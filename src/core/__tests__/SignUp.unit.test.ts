import { SignUp } from "../usecases/SignUp";
import { InMemoryEncryptionGateway } from "./adapters/gateways/InMemoryEncryptionGateway";
import { UuidGateway } from "./adapters/gateways/UuidGateway";
import { InMemoryUserRepository } from "./adapters/repositories/InMemoryUserRepository";



const db = new Map();

const encryptionGateway = new InMemoryEncryptionGateway();
const userRepository = new InMemoryUserRepository(db);
const idGateway = new UuidGateway();


const signUp = new SignUp(userRepository, idGateway, encryptionGateway);


describe('Unit - SignUp', () => {

    it('Should create a user', async () => {
        const result = await signUp.execute({
            email: "hello@yopmail.com",
            password: "123456"
        })
        expect(result.props.email).toEqual("hello@yopmail.com")
    })
})