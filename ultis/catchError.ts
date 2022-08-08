import * as grpc from '@grpc/grpc-js'
const BAD_REQ = 400
const Internal_Server_Error = 500
const catchErrors = (fn: Function) => {
    return function (_: any, callback: any) {
        fn(_, callback).catch((err: any) => {                        
            if (typeof err === 'string') {
                callback({
                    code: BAD_REQ,
                    details: err,
                })
            } else {
                callback({
                    code: Internal_Server_Error,
                    details:
                        err.message ??
                        (typeof err === 'string' ? err : 'Unknow'),
                })
            }
        })
    }
}
export default catchErrors
