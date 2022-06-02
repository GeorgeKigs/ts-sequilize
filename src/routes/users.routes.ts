import { UserDetails, getUser } from "../models/user.models";
import express, { Request, Response, NextFunction } from "express";
import { User } from "../models/db";

var route = express.Router();
var user = new UserDetails();

route
	.get(
		"/get/firstName/:firstName",
		async (req: Request, res: Response, next: NextFunction) => {
			var body = req.params;
			var firstName = body["firstName"];
			var results: User | null = await UserDetails.getUserByName(firstName);
			res.json({
				status: 200,
				result: results?.toJSON(),
			});
		}
	)
	.get("/get/id/:id", async (req, res, next) => {
		try {
			const id = parseInt(req.params.id);
			let result: User | null = await UserDetails.getUserById(id);
			res.json({
				status: 200,
				result,
			});
		} catch {
			res.json({
				error: "Id is not an int",
			});
		}
	})
	.get("/getAllUsers", async (req, res, next) => {
		const result: User[] | null = await UserDetails.getAllUsers();
		res.json({
			status: 200,
			count: result?.length,
			result,
		});
	})
	.post("/add", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["firstName"];
		body = { firstName: body };

		let result = await user.createUser(body);
		res.json({
			status: 200,
			result: result,
		});
	})
	.delete("/del", async (req: Request, res: Response, next: NextFunction) => {
		var body: string = req.body["firstName"];
		const result: number = await UserDetails.deleteUser(body);

		res.json({
			status: 200,
			result: "success",
			data: {
				deleted_rows: result,
			},
		});
	})
	.post("/update", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["data"];
		var id = req.body["id"];
		const result: number | null = await UserDetails.updateUser(id, body);
		res.json({
			status: 200,
			result: "success",
			data: {
				affectedResults: result,
			},
		});
	});

export { route as userRoute };
