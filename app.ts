import express from "express";
import cors from "cors";
import z from "zod";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { user } from "./schema";

//Initiaze Express
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/user", async (req, res) => {
	const result = await db.query.user.findMany();
	res.send(result);
});

app.delete("/api/user/:userId/delete", async (req, res) => {
	const userId = req.params.userId;
	const result = await db.delete(user).where(eq(user.id, +userId));

	if (result[0].affectedRows > 0) {
		res.send({
			status: "success",
			message: "Bruker slettet.",
		});
		return;
	}

	res.status(400);
	res.send({
		status: "error",
		message: "Ingen brukere ble slettet av en eller annen grunn.",
	});
});

app.post("/api/user/create", async (req, res) => {
	const zCreateUser = z.object({
		firstName: z.string().min(3),
		lastName: z.string().min(3),
		email: z.string().email(),
	});

	const parseResult = zCreateUser.safeParse(req.body);
	if (!parseResult.success) {
		res.status(400);
		res.send({
			status: "error",
			message: "Fornavn, etternavn og e-post må oppgis i gyldig format.",
		});
		return;
	}

	const result = await db.insert(user).values(parseResult.data);

	if (result[0].affectedRows > 0) {
		res.send({
			status: "success",
			message: "Bruker lagt til.",
		});
		return;
	}

	res.status(400);
	res.send({
		status: "error",
		message: "Ingen bruker lagt til av en eller annen grunn.",
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
