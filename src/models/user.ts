import { User } from "./db";

interface getUser {
	firstName: string;
	id?: number;
}

class UserDetails {
	user: User | null;

	constructor() {
		this.user = null;
	}

	public getUser(): User | null {
		return this.user;
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
		this.user = await User.create(data, {
			fields: ["firstName"],
		});
	}
	public async deleteUser(): Promise<boolean> {
		if (this.user instanceof User) {
			await User.destroy({
				where: {
					firstName: this.user.firstName,
				},
			});
			return true;
		}
		return false;
	}
	public async updateUser(data: getUser) {
		if (this.user instanceof User) {
			await this.user.update(data);
		}
		throw new Error("User is not defined");
	}
}

export default UserDetails;
