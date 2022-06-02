import { User } from "./db";

interface getUser {
	firstName: string;
	id?: number;
}

class UserDetails {
	public static async getUserByName(firstName: string): Promise<User | null> {
		let result = await User.findOne({
			where: {
				firstName,
			},
			attributes: ["firstName", "id"],
		});
		return result;
	}
	public async createUser(data: getUser) {
		await User.create(data, {
			fields: ["firstName"],
		});
	}
	public static async deleteUser(firstName: string): Promise<boolean> {
		await User.destroy({
			where: {
				firstName: firstName,
			},
		});
		return true;
	}
	public static async updateUser(id: number, data: getUser) {
		await User.update(data, {
			where: {
				id: id,
			},
		});
	}
}

export default UserDetails;
