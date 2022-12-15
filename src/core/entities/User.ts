export type UserProperties = {
    id: string;
    email: string;
    password: string;
    recoveryCode?: string;
}


export class User {
    props: UserProperties;


    constructor(props: UserProperties) {
        this.props = props;
    }


    static create(props: {
        id: string;
        email: string;
        password: string;
    }) {
        return new User({
            id: props.id,
            email: props.email,
            password: props.password,
        })
    }

    generateRecoveryCode(code: string) {
        this.props.recoveryCode = code;
    }

    resetPassword(payload: {code: string; password: string}) {
        if (this.props.recoveryCode !== payload.code) {
            throw new Error('INVALID_RECOVERY_CODE');
        }
        this.props.password = payload.password;
    }
}