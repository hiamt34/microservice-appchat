import * as grpc from '@grpc/grpc-js'
import { handleUnaryCall } from '@grpc/grpc-js'
import { User as UserModel } from '../models/user.model'
import { Empty__Output, Empty } from '../protos/interfaces/user/Empty'
import { GetAllAndSearch__Output } from '../protos/interfaces/user/GetAllAndSearch'
import { User, User__Output } from '../protos/interfaces/user/User'
import { UserList } from '../protos/interfaces/user/UserList'
import { UserLogin__Output } from '../protos/interfaces/user/UserLogin'
import { UserRequestId__Output } from '../protos/interfaces/user/UserRequestId'
import { UserServiceHandlers } from '../protos/interfaces/user/UserService'
import { UserUpdate__Output } from '../protos/interfaces/user/UserUpdate'

class UserService implements UserServiceHandlers {
    [name: string]: grpc.UntypedHandleCall
    Get: handleUnaryCall<UserRequestId__Output, User> = async (
        call,
        callback
    ) => {
        const { _id } = call.request
        const user = (await UserModel.findOne({ _id })) as User
        callback(null, user)
    }
    GetAll: handleUnaryCall<GetAllAndSearch__Output, UserList> = async (call, callback) => {
        let query = {}
        const {name} = call.request
        const {ids} = call.request
        //@ts-ignore
        if(name) query.name = new RegExp(name)
        if (ids) query = {_id: { $in: ids}}
        
        const users = (await UserModel.find(query))

        callback(null, {users}) 
    }
    Insert: handleUnaryCall<User__Output, User> = async (call, callback) => {
        const user = call.request as UserLogin__Output
        const userGetByModel = await UserModel.findOne({ email: user.email })
        if (userGetByModel) {
            callback({
                code: grpc.status.ALREADY_EXISTS,
                details: 'email is exist',
            })
        }
        const userInsert = await UserModel.findOneAndUpdate(
            { email: user.email },
            user,
            {
                new: true,
                upsert: true,
            }
        )
        callback(null, userInsert)
    }
    IsExitUser: handleUnaryCall<UserLogin__Output, User> = async (
        call,
        callback
    ) => {
        const user = call.request as UserLogin__Output
        const userGetByModel = await UserModel.findOne({ email: user.email })
        if (!userGetByModel) {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'email not found',
            })
        }

        const isValid = await userGetByModel?.comparePassword(
            user.password as string
        )
        if (!isValid) {
            callback({
                code: grpc.status.FAILED_PRECONDITION,
                details: 'password is wrong',
            })
        }

        callback(null, userGetByModel)
    }
    Remove: handleUnaryCall<UserRequestId__Output, Empty> = async (
        call,
        callback
    ) => {
        const { _id } = call.request
        await UserModel.deleteOne({ _id })
        callback(null, {})
    }
    Update: handleUnaryCall<UserUpdate__Output, User> = async (call, callback) => {
        const user = call.request as UserUpdate__Output
        
        const userInsert = await UserModel.findOneAndUpdate(
            { _id: user._id },
            user,
            {
                new: true,
                upsert: true,
            }
        )
        callback(null, userInsert)
    }
    IsExitEmailAndInsert: grpc.handleUnaryCall<User__Output, User> = async (
        call,
        callback
    ) => {
        const user = call.request as User__Output
        let userGetByModel = await UserModel.findOne({ email: user.email })
        if (!userGetByModel) {
            userGetByModel = await UserModel.create(user)
        }
        
        callback(null, userGetByModel)
    }
}
const userService = new UserService()
export default userService
