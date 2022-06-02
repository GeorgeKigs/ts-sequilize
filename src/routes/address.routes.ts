import AddressDetails from "../models/address.model";
import express, { Request, Response, NextFunction, Application } from "express";

const router = express.Router();
router
	.get("/get", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body;
		var address = body["address"];
		var results = await AddressDetails.getAddressByName(address);
		res.json({
			status: 200,
			result: results?.toJSON(),
		});
	})
	.post("/add", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body;
		await AddressDetails.createAddress(body);
		res.json({
			status: 200,
			result: "",
		});
	})
	.delete("/del", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["address"];

		await AddressDetails.deleteAddress(body);
		res.json({
			status: 200,
			result: "success",
		});
	})
	.post("/update", async (req: Request, res: Response, next: NextFunction) => {
		var body = req.body["data"];
		var id = req.body["id"];
		await AddressDetails.updateAddress(id, body);
		res.json({
			status: 200,
			result: "success",
		});
	});

export { router as addressRoute };
