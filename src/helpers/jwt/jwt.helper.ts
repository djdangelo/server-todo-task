import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const jwtHelper = {
    generateToken(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const payload = { id };
            const options: SignOptions = {
                expiresIn: '5h'
            };

            jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', options, (err, token) => {
                if (err || !token) {
                    console.error(err);
                    return reject('Error generating user token');
                }
                resolve(token);
            });
        });
    },

    verifyToken(token: string): string | JwtPayload {
        return jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    },
}

export default jwtHelper;