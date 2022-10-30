import bcrypt from 'bcrypt';

const saltRounds = 12;
async function encryptPassword(plainText){
    return await bcrypt.hash(plainText, saltRounds);
}

async function validatePassword(userInput, hashPassword){
    return await bcrypt.compare(userInput, hashPassword);
}

export {
    encryptPassword,
    validatePassword,
}