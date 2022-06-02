import UserDetails from "../models/user.models";
import express, { Request, Response, NextFunction } from "express";

var route = express.Router();
var user = new UserDetails();

route
	.get("/get", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body;
		var firstName = body["firstName"];
		var results = await UserDetails.getUserByName(firstName);
		res.json({
			status: 200,
			result: results?.toJSON(),
		});
	})
	.post("/add", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body;
		await user.createUser(body);
		res.json({
			status: 200,
			result: "",
		});
	})
	.delete("/del", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["firstName"];

		await UserDetails.deleteUser(body);
		res.json({
			status: 200,
			result: "success",
		});
	})
	.post("/update", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["data"];
		var id = req.body["id"];
		await UserDetails.updateUser(id, body);
		res.json({
			status: 200,
			result: "success",
		});
	});

export { route as userRoute };
