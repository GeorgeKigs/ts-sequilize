import { Address } from "./db";

interface getUser {
	address: string;
	id?: number;
}

class AddressDetails {
	public static async getAddressByName(
		address: string
	): Promise<Address | null> {
		let result = await Address.findOne({
			where: {
				address,
			},
			attributes: ["address", "id"],
		});
		return result;
	}
	public static async createAddress(data: getUser) {
		await Address.create(data, {
			fields: ["address"],
		});
	}
	public static async deleteAddress(address: string): Promise<boolean> {
		await Address.destroy({
			where: {
				address: address,
			},
		});
		return true;
	}

	public static async updateAddress(id: number, data: getUser) {
		await Address.update(data, {
			where: {
				id,
			},
		});
	}
}

export default AddressDetails;
