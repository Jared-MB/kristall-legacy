import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class Crypto {
  private key: any;
  private readonly password = process.env.CRYPTO_SECRET as string;
  private salt = process.env.CRYPTO_SALT as string;

  constructor() {
    promisify(scrypt)(this.password, this.salt, 32).then((key: any) => {
      this.key = key;
    });
  }

  async encryptData(
    textToEncrypt: string | number,
    userPassword?: string,
  ) {
    if (!this.password) {
      throw new Error('CRYPTO_SECRET is not set')
    }
    const iv = randomBytes(16) as any
    let key = this.key;
    if (userPassword) {
      key = (await promisify(scrypt)(
        this.password + '.' + userPassword,
        this.salt,
        32,
      )) as any;
    }
    const textToString = String(textToEncrypt);
    const cipher = createCipheriv(('aes-256-ctr' as any), key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(textToString) as any,
      cipher.final(),
    ]);
    return iv.toString('base64') + '.' + encryptedText.toString('base64');
  }

  async decryptData(textToDecrypt: string, userPassword?: string) {
    if (!this.password) {
      throw new Error('CRYPTO_SECRET is not set')
    }
    let key = this.key;
    if (userPassword) {
      key = (await promisify(scrypt)(
        this.password + '.' + userPassword,
        this.salt,
        32,
      )) as Buffer;
    }
    const textToString = String(textToDecrypt);
    const [hexIV, hexText] = textToString.split('.');
    const iv = Buffer.from(hexIV, 'base64') as any;
    const text = Buffer.from(hexText, 'base64') as any;
    const decipher = createDecipheriv(('aes-256-ctr' as any), key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(text) as any,
      decipher.final(),
    ]);
    return decryptedText.toString('utf-8');
  }
}
