import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RoomServiceClient as _room_RoomServiceClient, RoomServiceDefinition as _room_RoomServiceDefinition } from './room/RoomService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  room: {
    Empty: MessageTypeDefinition
    InsertUserForRoom: MessageTypeDefinition
    OutRoom: MessageTypeDefinition
    Room: MessageTypeDefinition
    RoomId: MessageTypeDefinition
    RoomList: MessageTypeDefinition
    RoomService: SubtypeConstructor<typeof grpc.Client, _room_RoomServiceClient> & { service: _room_RoomServiceDefinition }
    UserId: MessageTypeDefinition
  }
}

