import { Injectable } from '@nestjs/common';
import * as util from 'util';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly pbkdf2 = util.promisify(crypto.pbkdf2);
  private readonly iterations = 10000;
  private readonly keyLength = 32;
  private readonly digest = 'sha512';

  async hash(data: string, salt: string) {
    const dataHashBuffer = await this.pbkdf2(
      data,
      salt,
      this.iterations,
      this.keyLength,
      this.digest,
    );
    return dataHashBuffer.toString('hex');
  }

  generateSalt(size: number): string {
    return crypto.randomBytes(size).toString('hex');
  }
}
