import { EncryptionGateway } from "../../../gateways/EncryptionGateway";

export class InMemoryEncryptionGateway implements EncryptionGateway {
    async encrypt(password: string): Promise<string> {
        return password;
    }
}