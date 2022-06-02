import { Projects } from "./db";

interface getUser {
	name: string;
	id?: number;
}

class ProjectDetails {
	public static async getProjectByName(name: string): Promise<Projects | null> {
		let result = await Projects.findOne({
			where: {
				name,
			},
			attributes: ["name", "id"],
		});
		return result;
	}
	public static async createProject(data: getUser) {
		await Projects.create(data, {
			fields: ["name"],
		});
	}
	public static async deleteProject(name: string): Promise<boolean> {
		await Projects.destroy({
			where: {
				name,
			},
		});
		return true;
	}
	public static async updateProject(id: number, data: getUser) {
		await Projects.update(data, {
			where: {
				id,
			},
		});
	}
}

export default ProjectDetails;
