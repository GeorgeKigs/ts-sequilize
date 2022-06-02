import ProjectDetails from "../models/projects.models";
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router
	.get("/get", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body;
		var project = body["project"];
		var results = await ProjectDetails.getProjectByName(project);
		res.json({
			status: 200,
			result: results?.toJSON(),
		});
	})
	.post("/add", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body;
		await ProjectDetails.createProject(body);
		res.json({
			status: 200,
			result: "",
		});
	})
	.delete("/del", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["project"];

		await ProjectDetails.deleteProject(body);
		res.json({
			status: 200,
			result: "success",
		});
	})
	.post("/update", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["data"];
		var id = req.body["id"];
		await ProjectDetails.updateProject(id, body);
		res.json({
			status: 200,
			result: "success",
		});
	});
export { router as projectRoute };
