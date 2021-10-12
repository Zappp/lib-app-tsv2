import crypto from 'crypto';


export function validPassword(password: any, hash: any, salt: any) { //moze ulec zmianie po przeczytaniu dokumentacji
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

export function genPassword(password: any) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}
