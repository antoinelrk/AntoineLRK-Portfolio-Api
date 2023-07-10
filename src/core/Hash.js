import argon2 from "argon2";

export const make = async (plainTextPassword) => await argon2.hash(plainTextPassword, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 4,
    parallelism: 2,
    hashLength: 32
}).then((hash) => hash).catch((error) => error)

export const verify = async (hashedPassword, plainTextPassword) => await argon2.verify(hashedPassword, plainTextPassword).then(match => match)