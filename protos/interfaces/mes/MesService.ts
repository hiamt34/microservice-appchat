// Original file: protos/mes.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _mes_Empty, Empty__Output as _mes_Empty__Output } from '../mes/Empty';
import type { MesIsert as _mes_MesIsert, MesIsert__Output as _mes_MesIsert__Output } from '../mes/MesIsert';
import type { MesList as _mes_MesList, MesList__Output as _mes_MesList__Output } from '../mes/MesList';
import type { RoomId as _mes_RoomId, RoomId__Output as _mes_RoomId__Output } from '../mes/RoomId';

export interface MesServiceClient extends grpc.Client {
  GetMesInRoom(argument: _mes_RoomId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  GetMesInRoom(argument: _mes_RoomId, metadata: grpc.Metadata, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  GetMesInRoom(argument: _mes_RoomId, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  GetMesInRoom(argument: _mes_RoomId, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  getMesInRoom(argument: _mes_RoomId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  getMesInRoom(argument: _mes_RoomId, metadata: grpc.Metadata, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  getMesInRoom(argument: _mes_RoomId, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  getMesInRoom(argument: _mes_RoomId, callback: grpc.requestCallback<_mes_MesList__Output>): grpc.ClientUnaryCall;
  
  Insert(argument: _mes_MesIsert, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  Insert(argument: _mes_MesIsert, metadata: grpc.Metadata, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  Insert(argument: _mes_MesIsert, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  Insert(argument: _mes_MesIsert, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _mes_MesIsert, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _mes_MesIsert, metadata: grpc.Metadata, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _mes_MesIsert, options: grpc.CallOptions, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  insert(argument: _mes_MesIsert, callback: grpc.requestCallback<_mes_Empty__Output>): grpc.ClientUnaryCall;
  
}

export interface MesServiceHandlers extends grpc.UntypedServiceImplementation {
  GetMesInRoom: grpc.handleUnaryCall<_mes_RoomId__Output, _mes_MesList>;
  
  Insert: grpc.handleUnaryCall<_mes_MesIsert__Output, _mes_Empty>;
  
}

export interface MesServiceDefinition extends grpc.ServiceDefinition {
  GetMesInRoom: MethodDefinition<_mes_RoomId, _mes_MesList, _mes_RoomId__Output, _mes_MesList__Output>
  Insert: MethodDefinition<_mes_MesIsert, _mes_Empty, _mes_MesIsert__Output, _mes_Empty__Output>
}
