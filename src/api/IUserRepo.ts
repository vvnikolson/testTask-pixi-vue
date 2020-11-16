import { UserInfo } from "../models/UserInfo";

export default interface IUserRepo {

    getInfo() : Promise<UserInfo>
}