import { Address } from "./db";



interface getUser{address:string,id?:number}

class AddressDetails{
    address:Address|null;

    constructor (){
        this.address = null;
    }

    public getUser():Address|null{
        return this.address;
    }
    public static async getUserByName(address:string):Promise<Address|null>{
        let result = await Address.findOne({
            where:{
                address
            },
            attributes:["address","id"]
        })
        return result;
    }
    public async createAddress(data:getUser) {
        this.address = await Address.create(
            data,{
                fields:["address"]
            }
        )
    }
    public async deleteAddress():Promise<boolean> {
        if (this.address instanceof Address){
            await Address.destroy({
                where:{
                    address:this.address.address
                }
            })
            return true
        }
        return false
    }
    public async updateAddress(data:getUser) {
        if(this.address instanceof Address){
            await this.address.update(data)
        }
        throw new Error("Address is not defined")
    }
}

export default AddressDetails;