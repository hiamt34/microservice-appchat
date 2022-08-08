// Original file: protos/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from '../user/Empty';
import type { GetAllAndSearch as _user_GetAllAndSearch, GetAllAndSearch__Output as _user_GetAllAndSearch__Output } from '../user/GetAllAndSearch';
import type { User as _user_User, User__Output as _user_User__Output } from '../user/User';
import type { UserList as _user_UserList, UserList__Output as _user_UserList__Output } from '../user/UserList';
import type { UserLogin as _user_UserLogin, UserLogin__Output as _user_UserLogin__Output } from '../user/UserLogin';
import type { UserRequestId as _user_UserRequestId, UserRequestId__Output as _user_UserRequestId__Output } from '../user/UserRequestId';
import type { UserUpdate as _user_UserUpdate, UserUpdate__Output as _user_UserUpdate__Output } from '../user/UserUpdate';

export interface UserServiceClient extends grpc.Client {
  Get(argument: _user_UserRequestId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Get(argument: _user_UserRequestId, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Get(argument: _user_UserRequestId, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Get(argument: _user_UserRequestId, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  get(argument: _user_UserRequestId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  get(argument: _user_UserRequestId, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  get(argument: _user_UserRequestId, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  get(argument: _user_UserRequestId, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
  GetAll(argument: _user_GetAllAndSearch, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _user_GetAllAndSearch, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _user_GetAllAndSearch, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _user_GetAllAndSearch, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _user_GetAllAndSearch, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _user_GetAllAndSearch, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _user_GetAllAndSearch, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _user_GetAllAndSearch, callback: grpc.requestCallback<_user_UserList__Output>): grpc.ClientUnaryCall;
  
  Insert(argument: _user_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Insert(argument: _user_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Insert(argument: _user_User, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Insert(argument: _user_User, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _user_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _user_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _user_User, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _user_User, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
  IsExitEmailAndInsert(argument: _user_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  IsExitEmailAndInsert(argument: _user_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  IsExitEmailAndInsert(argument: _user_User, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  IsExitEmailAndInsert(argument: _user_User, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitEmailAndInsert(argument: _user_User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitEmailAndInsert(argument: _user_User, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitEmailAndInsert(argument: _user_User, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitEmailAndInsert(argument: _user_User, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
  IsExitUser(argument: _user_UserLogin, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  IsExitUser(argument: _user_UserLogin, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  IsExitUser(argument: _user_UserLogin, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  IsExitUser(argument: _user_UserLogin, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitUser(argument: _user_UserLogin, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitUser(argument: _user_UserLogin, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitUser(argument: _user_UserLogin, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  isExitUser(argument: _user_UserLogin, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
  Remove(argument: _user_UserRequestId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  Remove(argument: _user_UserRequestId, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  Remove(argument: _user_UserRequestId, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  Remove(argument: _user_UserRequestId, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  remove(argument: _user_UserRequestId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  remove(argument: _user_UserRequestId, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  remove(argument: _user_UserRequestId, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  remove(argument: _user_UserRequestId, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _user_UserUpdate, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Update(argument: _user_UserUpdate, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Update(argument: _user_UserUpdate, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  Update(argument: _user_UserUpdate, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  update(argument: _user_UserUpdate, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  update(argument: _user_UserUpdate, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  update(argument: _user_UserUpdate, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  update(argument: _user_UserUpdate, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  Get: grpc.handleUnaryCall<_user_UserRequestId__Output, _user_User>;
  
  GetAll: grpc.handleUnaryCall<_user_GetAllAndSearch__Output, _user_UserList>;
  
  Insert: grpc.handleUnaryCall<_user_User__Output, _user_User>;
  
  IsExitEmailAndInsert: grpc.handleUnaryCall<_user_User__Output, _user_User>;
  
  IsExitUser: grpc.handleUnaryCall<_user_UserLogin__Output, _user_User>;
  
  Remove: grpc.handleUnaryCall<_user_UserRequestId__Output, _user_Empty>;
  
  Update: grpc.handleUnaryCall<_user_UserUpdate__Output, _user_User>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  Get: MethodDefinition<_user_UserRequestId, _user_User, _user_UserRequestId__Output, _user_User__Output>
  GetAll: MethodDefinition<_user_GetAllAndSearch, _user_UserList, _user_GetAllAndSearch__Output, _user_UserList__Output>
  Insert: MethodDefinition<_user_User, _user_User, _user_User__Output, _user_User__Output>
  IsExitEmailAndInsert: MethodDefinition<_user_User, _user_User, _user_User__Output, _user_User__Output>
  IsExitUser: MethodDefinition<_user_UserLogin, _user_User, _user_UserLogin__Output, _user_User__Output>
  Remove: MethodDefinition<_user_UserRequestId, _user_Empty, _user_UserRequestId__Output, _user_Empty__Output>
  Update: MethodDefinition<_user_UserUpdate, _user_User, _user_UserUpdate__Output, _user_User__Output>
}
