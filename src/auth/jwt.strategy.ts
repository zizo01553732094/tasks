import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const isRevoked = await this.refreshTokenService.isTokenRevoked(payload.refresh_token);
    if (isRevoked) {
      throw new UnauthorizedException('Token has been revoked');
    }
    return { userId: payload.sub, email: payload.email };
  }
}
