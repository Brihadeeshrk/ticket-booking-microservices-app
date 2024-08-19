import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// scrypt is callback oriented but it would be better if we went with a promise based approach
const scryptAsync = promisify(scrypt);

export class Password {
  // you can access static methods without creating a new instance of Password
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex"); // random str
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashedPassword;
  }
}
