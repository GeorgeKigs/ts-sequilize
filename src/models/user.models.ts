import { User } from "./db";

interface getUser {
	firstName: string;
	id?: number;
}

class UserDetails {
	public static async getAllUsers(): Promise<User[] | null> {
		let result: User[] = await User.findAll({
			attributes: ["firstName", "id"],
		});
		return result;
	}
	public static async getUserById(id: number): Promise<User | null> {
		return User.findByPk(id, {
			attributes: ["firstName", "id"],
		});
	}
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
		return await User.create(data, {
			fields: ["firstName"],
		});
	}
	public static async deleteUser(firstName: string): Promise<number> {
		/**
		 * Returns the number of deleted rows
		 */
		return await User.destroy({
			where: {
				firstName: firstName,
			},
		});
	}
	public static async updateUser(
		id: number,
		data: getUser
	): Promise<number | null> {
		const result = await User.update(data, {
			where: {
				id: id,
			},
		});
		return result[0];
	}
}

export { UserDetails, getUser };
