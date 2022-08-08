import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthServiceClient as _auth_AuthServiceClient, AuthServiceDefinition as _auth_AuthServiceDefinition } from './auth/AuthService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  auth: {
    AccessToken: MessageTypeDefinition
    AuthService: SubtypeConstructor<typeof grpc.Client, _auth_AuthServiceClient> & { service: _auth_AuthServiceDefinition }
    Empty: MessageTypeDefinition
    RefreshToken: MessageTypeDefinition
    TokenExit: MessageTypeDefinition
    Tokens: MessageTypeDefinition
    User: MessageTypeDefinition
    UserLoginOauth: MessageTypeDefinition
    UserRegister: MessageTypeDefinition
  }
}

