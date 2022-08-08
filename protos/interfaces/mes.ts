import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MesServiceClient as _mes_MesServiceClient, MesServiceDefinition as _mes_MesServiceDefinition } from './mes/MesService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  mes: {
    Empty: MessageTypeDefinition
    Mes: MessageTypeDefinition
    MesIsert: MessageTypeDefinition
    MesList: MessageTypeDefinition
    MesService: SubtypeConstructor<typeof grpc.Client, _mes_MesServiceClient> & { service: _mes_MesServiceDefinition }
    RoomId: MessageTypeDefinition
  }
}

