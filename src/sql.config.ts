import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config({ path: ".env" });
// console.log(process.env);
const sequelize = new Sequelize(
	//@ts-ignore
	process.env.AWS_DB_MYSQL,
	process.env["AWS_USERNAME_MYSQL"],
	process.env["AWS_PASSWORD_MYSQL"],
	{
		host: "database-1.cgyoy1jvpwmn.us-east-1.rds.amazonaws.com",
		dialect: "postgres",
	}
);

export { sequelize as sequelize_db };
