import { Injectable } from '@nestjs/common';
import { InjectRedis } from 'nestjs-redis';
import * as Redis from 'ioredis';

@Injectable()
export class RefreshTokenService {
  constructor(@InjectRedis() private readonly redis: Redis.Redis) {}

  async storeRefreshToken(refreshToken: string, userId: string, expiresIn: number) {
    await this.redis.set(refreshToken, userId, 'EX', expiresIn);
  }

  async isTokenRevoked(refreshToken: string): Promise<boolean> {
    const token = await this.redis.get(refreshToken);
    return !token;  // If token is not found, it's considered revoked
  }

  async revokeRefreshToken(refreshToken: string) {
    await this.redis.del(refreshToken);
  }
}
