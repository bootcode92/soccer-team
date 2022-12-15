export interface EncryptionGateway {
    encrypt(password: string): Promise<string>;
}