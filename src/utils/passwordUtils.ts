import bcrypt from "bcryptjs";

class PasswordUtils {
  async encrypt(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainText, salt);

    return hashed;
  }
}
export default new PasswordUtils();