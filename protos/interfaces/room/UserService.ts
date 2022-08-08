// Original file: protos/room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _room_Empty, Empty__Output as _room_Empty__Output } from '../room/Empty';
import type { Room as _room_Room, Room__Output as _room_Room__Output } from '../room/Room';
import type { RoomList as _room_RoomList, RoomList__Output as _room_RoomList__Output } from '../room/RoomList';
import type { UserId as _room_UserId, UserId__Output as _room_UserId__Output } from '../room/UserId';

export interface UserServiceClient extends grpc.Client {
  GetRoom(argument: _room_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _room_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _room_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _room_UserId, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  
  Insert(argument: _room_Room, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  Insert(argument: _room_Room, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  Insert(argument: _room_Room, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  Insert(argument: _room_Room, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  
  InsertUserForRoom(argument: _room_Room, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  InsertUserForRoom(argument: _room_Room, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  InsertUserForRoom(argument: _room_Room, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  InsertUserForRoom(argument: _room_Room, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_Room, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_Room, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_Room, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_Room, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  GetRoom: grpc.handleUnaryCall<_room_UserId__Output, _room_RoomList>;
  
  Insert: grpc.handleUnaryCall<_room_Room__Output, _room_Empty>;
  
  InsertUserForRoom: grpc.handleUnaryCall<_room_Room__Output, _room_Empty>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  GetRoom: MethodDefinition<_room_UserId, _room_RoomList, _room_UserId__Output, _room_RoomList__Output>
  Insert: MethodDefinition<_room_Room, _room_Empty, _room_Room__Output, _room_Empty__Output>
  InsertUserForRoom: MethodDefinition<_room_Room, _room_Empty, _room_Room__Output, _room_Empty__Output>
}
