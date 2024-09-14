import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

export const FeedbackInput = z.object({
	email: z.string().email({ message: "Invalid email type" }),
	name: z.string().min(2, { message: "Name cannot be empty" }),
	message: z.string().min(2, { message: "Message cannot be empty" }),
});

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();

userRouter.post("/postFeedback", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const result = FeedbackInput.safeParse(body);

	if (!result.success) {
		return c.json({
			status: 406,
			message: result.error.issues[0].message,
		});
	}

	try {
		const exists = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});
		if (exists) {
			return c.json({
				status: 403,
				message: "This email is already in use, please login",
			});
		}
		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				message: body.message,
			},
		});
		return c.json({
			status: 201,
			message: "Feedback posted successfully",
		});
	} catch (error) {
		return c.json({
			status: 406,
			message: "error while posting feedback",
		});
	}
});
