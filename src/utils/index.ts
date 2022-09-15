import bcrypt from "bcrypt";

export function HashPassword<T>(password: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      bcrypt.hash(password, 10, (error, hash: any) => {
        error && reject(error);
        resolve(hash);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function VerifyPassword<T>(password: string, hpassword: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      bcrypt.compare(password, hpassword, (error, match: any) => {
        error && reject(error);
        resolve(match);
      });
    } catch (error) {
      reject(error);
    }
  });
}
