import {
	Model,
	Association,
	NonAttribute,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	ForeignKey,
	DataTypes,
} from "sequelize";

import { sequelize_db } from "../sql.config";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<number>;

	declare firstName: string;
	declare password: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare projects?: NonAttribute<Projects[]>;
	declare address?: NonAttribute<Address[]>;

	get getName(): NonAttribute<string> {
		return this.firstName;
	}
	declare static associations: {
		projects: Association<User, Projects>;
	};
}

class Projects extends Model<
	InferAttributes<Projects>,
	InferCreationAttributes<Projects>
> {
	declare id: CreationOptional<number>;

	declare ownerId: ForeignKey<User["id"]>;
	declare name: string;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare owner?: NonAttribute<User>;
}

class Address extends Model<
	InferAttributes<Address>,
	InferCreationAttributes<Address>
> {
	declare id: CreationOptional<number>;
	declare address: string;
	declare ownerId: ForeignKey<User["id"]>;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "User",
		paranoid: true,
		deletedAt: "deletedAt",

		sequelize: sequelize_db,
	}
);

Projects.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		tableName: "Projects",
		paranoid: true,
		sequelize: sequelize_db,
	}
);

Address.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		address: {
			type: DataTypes.STRING,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		sequelize: sequelize_db,
		tableName: "Address",
	}
);

Projects.belongsTo(User);
Address.belongsTo(User);

User.hasMany(Projects, {
	onUpdate: "CASCADE",
	onDelete: "CASCADE",
});

User.hasMany(Address, {
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

export { User, Projects, Address };
