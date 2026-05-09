import bcrypt from 'bcrypt';

export const HashPassword = async (pass: string) => {
    return await bcrypt.hash(pass, 10);
}

export const ComparePassword = async (pass: string, hashPass: string) => {
    return bcrypt.compare(pass, hashPass)
}