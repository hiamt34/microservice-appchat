// Original file: protos/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccessToken as _auth_AccessToken, AccessToken__Output as _auth_AccessToken__Output } from '../auth/AccessToken';
import type { Empty as _auth_Empty, Empty__Output as _auth_Empty__Output } from '../auth/Empty';
import type { RefreshToken as _auth_RefreshToken, RefreshToken__Output as _auth_RefreshToken__Output } from '../auth/RefreshToken';
import type { TokenExit as _auth_TokenExit, TokenExit__Output as _auth_TokenExit__Output } from '../auth/TokenExit';
import type { Tokens as _auth_Tokens, Tokens__Output as _auth_Tokens__Output } from '../auth/Tokens';
import type { User as _auth_User, User__Output as _auth_User__Output } from '../auth/User';
import type { UserLoginOauth as _auth_UserLoginOauth, UserLoginOauth__Output as _auth_UserLoginOauth__Output } from '../auth/UserLoginOauth';
import type { UserRegister as _auth_UserRegister, UserRegister__Output as _auth_UserRegister__Output } from '../auth/UserRegister';

export interface AuthServiceClient extends grpc.Client {
  GetAccessToken(argument: _auth_RefreshToken, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  GetAccessToken(argument: _auth_RefreshToken, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  GetAccessToken(argument: _auth_RefreshToken, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  GetAccessToken(argument: _auth_RefreshToken, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  getAccessToken(argument: _auth_RefreshToken, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  getAccessToken(argument: _auth_RefreshToken, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  getAccessToken(argument: _auth_RefreshToken, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  getAccessToken(argument: _auth_RefreshToken, callback: grpc.requestCallback<_auth_AccessToken__Output>): grpc.ClientUnaryCall;
  
  Login(argument: _auth_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_User, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_User, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_User, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_User, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  
  LoginOauth(argument: _auth_UserLoginOauth, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  LoginOauth(argument: _auth_UserLoginOauth, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  LoginOauth(argument: _auth_UserLoginOauth, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  LoginOauth(argument: _auth_UserLoginOauth, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  loginOauth(argument: _auth_UserLoginOauth, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  loginOauth(argument: _auth_UserLoginOauth, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  loginOauth(argument: _auth_UserLoginOauth, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  loginOauth(argument: _auth_UserLoginOauth, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  
  Logout(argument: _auth_Tokens, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  Logout(argument: _auth_Tokens, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  Logout(argument: _auth_Tokens, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  Logout(argument: _auth_Tokens, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  logout(argument: _auth_Tokens, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  logout(argument: _auth_Tokens, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  logout(argument: _auth_Tokens, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  logout(argument: _auth_Tokens, callback: grpc.requestCallback<_auth_Empty__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _auth_UserRegister, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_UserRegister, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_UserRegister, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_UserRegister, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_UserRegister, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_UserRegister, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_UserRegister, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_UserRegister, callback: grpc.requestCallback<_auth_Tokens__Output>): grpc.ClientUnaryCall;
  
  ValidateToken(argument: _auth_AccessToken, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _auth_AccessToken, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _auth_AccessToken, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _auth_AccessToken, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_AccessToken, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_AccessToken, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_AccessToken, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _auth_AccessToken, callback: grpc.requestCallback<_auth_TokenExit__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  GetAccessToken: grpc.handleUnaryCall<_auth_RefreshToken__Output, _auth_AccessToken>;
  
  Login: grpc.handleUnaryCall<_auth_User__Output, _auth_Tokens>;
  
  LoginOauth: grpc.handleUnaryCall<_auth_UserLoginOauth__Output, _auth_Tokens>;
  
  Logout: grpc.handleUnaryCall<_auth_Tokens__Output, _auth_Empty>;
  
  Register: grpc.handleUnaryCall<_auth_UserRegister__Output, _auth_Tokens>;
  
  ValidateToken: grpc.handleUnaryCall<_auth_AccessToken__Output, _auth_TokenExit>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  GetAccessToken: MethodDefinition<_auth_RefreshToken, _auth_AccessToken, _auth_RefreshToken__Output, _auth_AccessToken__Output>
  Login: MethodDefinition<_auth_User, _auth_Tokens, _auth_User__Output, _auth_Tokens__Output>
  LoginOauth: MethodDefinition<_auth_UserLoginOauth, _auth_Tokens, _auth_UserLoginOauth__Output, _auth_Tokens__Output>
  Logout: MethodDefinition<_auth_Tokens, _auth_Empty, _auth_Tokens__Output, _auth_Empty__Output>
  Register: MethodDefinition<_auth_UserRegister, _auth_Tokens, _auth_UserRegister__Output, _auth_Tokens__Output>
  ValidateToken: MethodDefinition<_auth_AccessToken, _auth_TokenExit, _auth_AccessToken__Output, _auth_TokenExit__Output>
}
