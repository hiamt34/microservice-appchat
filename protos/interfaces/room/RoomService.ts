// Original file: protos/room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _room_Empty, Empty__Output as _room_Empty__Output } from '../room/Empty';
import type { InsertUserForRoom as _room_InsertUserForRoom, InsertUserForRoom__Output as _room_InsertUserForRoom__Output } from '../room/InsertUserForRoom';
import type { OutRoom as _room_OutRoom, OutRoom__Output as _room_OutRoom__Output } from '../room/OutRoom';
import type { Room as _room_Room, Room__Output as _room_Room__Output } from '../room/Room';
import type { RoomId as _room_RoomId, RoomId__Output as _room_RoomId__Output } from '../room/RoomId';
import type { RoomList as _room_RoomList, RoomList__Output as _room_RoomList__Output } from '../room/RoomList';
import type { UserId as _room_UserId, UserId__Output as _room_UserId__Output } from '../room/UserId';

export interface RoomServiceClient extends grpc.Client {
  GetRoom(argument: _room_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _room_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _room_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  GetRoom(argument: _room_UserId, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  getRoom(argument: _room_UserId, callback: grpc.requestCallback<_room_RoomList__Output>): grpc.ClientUnaryCall;
  
  GetRoomById(argument: _room_RoomId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  GetRoomById(argument: _room_RoomId, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  GetRoomById(argument: _room_RoomId, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  GetRoomById(argument: _room_RoomId, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  getRoomById(argument: _room_RoomId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  getRoomById(argument: _room_RoomId, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  getRoomById(argument: _room_RoomId, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  getRoomById(argument: _room_RoomId, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  
  Insert(argument: _room_Room, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  Insert(argument: _room_Room, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  Insert(argument: _room_Room, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  Insert(argument: _room_Room, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  insert(argument: _room_Room, callback: grpc.requestCallback<_room_Room__Output>): grpc.ClientUnaryCall;
  
  InsertUserForRoom(argument: _room_InsertUserForRoom, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  InsertUserForRoom(argument: _room_InsertUserForRoom, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  InsertUserForRoom(argument: _room_InsertUserForRoom, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  InsertUserForRoom(argument: _room_InsertUserForRoom, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_InsertUserForRoom, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_InsertUserForRoom, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_InsertUserForRoom, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  insertUserForRoom(argument: _room_InsertUserForRoom, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  
  OutRoom(argument: _room_OutRoom, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  OutRoom(argument: _room_OutRoom, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  OutRoom(argument: _room_OutRoom, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  OutRoom(argument: _room_OutRoom, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  outRoom(argument: _room_OutRoom, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  outRoom(argument: _room_OutRoom, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  outRoom(argument: _room_OutRoom, options: grpc.CallOptions, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  outRoom(argument: _room_OutRoom, callback: grpc.requestCallback<_room_Empty__Output>): grpc.ClientUnaryCall;
  
}

export interface RoomServiceHandlers extends grpc.UntypedServiceImplementation {
  GetRoom: grpc.handleUnaryCall<_room_UserId__Output, _room_RoomList>;
  
  GetRoomById: grpc.handleUnaryCall<_room_RoomId__Output, _room_Room>;
  
  Insert: grpc.handleUnaryCall<_room_Room__Output, _room_Room>;
  
  InsertUserForRoom: grpc.handleUnaryCall<_room_InsertUserForRoom__Output, _room_Empty>;
  
  OutRoom: grpc.handleUnaryCall<_room_OutRoom__Output, _room_Empty>;
  
}

export interface RoomServiceDefinition extends grpc.ServiceDefinition {
  GetRoom: MethodDefinition<_room_UserId, _room_RoomList, _room_UserId__Output, _room_RoomList__Output>
  GetRoomById: MethodDefinition<_room_RoomId, _room_Room, _room_RoomId__Output, _room_Room__Output>
  Insert: MethodDefinition<_room_Room, _room_Room, _room_Room__Output, _room_Room__Output>
  InsertUserForRoom: MethodDefinition<_room_InsertUserForRoom, _room_Empty, _room_InsertUserForRoom__Output, _room_Empty__Output>
  OutRoom: MethodDefinition<_room_OutRoom, _room_Empty, _room_OutRoom__Output, _room_Empty__Output>
}
