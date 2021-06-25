import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants';

@Injectable()
export class WsAuthGuard extends AuthGuard('jwt') {

  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    if (!context.args[0].handshake.headers.authorization) {

      throw new WsException('Você não tem permissão para acessar esses recursos.');
    }

    let bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];

    const payload = this.jwtService.verify(bearerToken, {
      secret: jwtConstants.secret
    });

    if (payload) {
      // Alguma logica para buscar o usuário por ID e retorna-lo
      return payload;
    }
  }
}