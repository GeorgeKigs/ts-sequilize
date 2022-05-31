import { Projects } from "./db";


interface getUser{name:string,id?:number}

class ProjectDetails{
    project:Projects|null;

    constructor (){
        this.project = null;
    }

    public getproject():Projects|null{
        return this.project;
    }
    public static async getProjectByName(name:string):Promise<Projects|null>{
        let result = await Projects.findOne({
            where:{
                name
            },
            attributes:["name","id"]
        })
        return result;
    }
    public async createProject(data:getUser) {
        this.project = await Projects.create(
            data,{
                fields:["name"]
            }
        )
    }
    public async deleteProject():Promise<boolean> {
        if (this.project instanceof Projects){
            await Projects.destroy({
                where:{
                    name:this.project.name
                }
            })
            return true
        }
        return false
    }
    public async updateProject(data:getUser) {
        if(this.project instanceof Projects){
            await this.project.update(data)
        }
        throw new Error("Projects is not defined")
    }
}

export default ProjectDetails;