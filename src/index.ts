import express, { Request, Response, NextFunction, Application } from "express";
import { sequelize } from "./models/db";
import { addressRoute } from "./routes/address.routes";
import { projectRoute } from "./routes/projects.routes";
import { userRoute } from "./routes/users.routes";

(async () => {
	await sequelize.sync();
})();

let app: Application = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/address", addressRoute);
app.use("/projects", projectRoute);

app.get("/home", (req: Request, res: Response) => {
	res.json({
		hello: "world",
	});
});

app.listen(5000, () => {
	console.log("Started Node JS server");
});
