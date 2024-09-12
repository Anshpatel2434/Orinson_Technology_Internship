import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

export const TodoInput = z.object({
	name: z.string().min(2, { message: "Name cannot be empty" }),
	description: z.string().min(2, { message: "Description cannot be empty" }),
});

export const todoRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();

todoRouter.post("/addTodo", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const result = TodoInput.safeParse(body);

	if (!result.success) {
		return c.json({
			status: 406,
			message: result.error.issues[0].message,
		});
	}

	try {
		const todo = await prisma.todo.create({
			data: {
				name: body.name,
				description: body.description,
				status: false,
			},
		});
		return c.json({
			status: 201,
			message: "Todo posted successfully",
		});
	} catch (error) {
		return c.json({
			status: 406,
			message: "error while posting todo",
		});
	}
});

todoRouter.get("/allTodos", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const todos = await prisma.todo.findMany();
		if (todos) {
			return c.json({
				status: 200,
				todos: todos,
			});
		}
		return c.json({
			status: 400,
			message: "no todos",
		});
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while fetching todos",
		});
	}
});

todoRouter.put("/updateStatus", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const { id, status } = await c.req.json();
		const todo = await prisma.todo.update({
			where: { id },
			data: { status: status },
		});
		if (todo) {
			return c.json({
				status: 200,
				message: "todo status updated successfully",
			});
		}
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while updating todo status",
		});
	}
});

todoRouter.delete("/deleteTodo/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const id = c.req.param("id");
		const todo = await prisma.todo.delete({
			where: { id: id },
		});
		if (todo) {
			return c.json({
				status: 200,
				message: "todo deleted successfully",
			});
		}
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while updating todo status",
		});
	}
});
