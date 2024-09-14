import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

export const BlogInput = z.object({
	title: z.string().min(2, { message: "Title cannot be empty" }),
	summary: z.string().min(10, { message: "Summary cannot be empty" }),
	content: z.string().min(10, { message: "Content cannot be empty" }),
});

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();

blogRouter.post("/postBlog", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		const body = await c.req.json();
		const result = BlogInput.safeParse(body);
		if (!result.success) {
			return c.json({
				status: 406,
				message: result.error.issues[0].message,
			});
		}
		const blog = await prisma.blog.create({
			data: body,
		});
		return c.json({
			status: 200,
			message: "Blog posted successfully",
			blog: blog,
		});
	} catch (error) {
		return c.json({
			status: 406,
			message: "error while posting feedback",
		});
	}
});

blogRouter.get("/allBlogs", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blogs = await prisma.blog.findMany();
		if (blogs) {
			return c.json({
				status: 200,
				blogs: blogs,
			});
		}
		return c.json({
			status: 400,
			message: "no blogs",
		});
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while fetching todos",
		});
	}
});

blogRouter.get("/getBlog/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const id = c.req.param("id");
		const blog = await prisma.blog.findFirst({
			where: { id: id },
		});
		if (blog) {
			return c.json({
				status: 200,
				blog: blog,
			});
		}
		return c.json({
			status: 400,
			message: "blog not found",
		});
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while fetching blog",
		});
	}
});

blogRouter.put("/updateBlog/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body = await c.req.json();
		const id = c.req.param("id");
		const blog = await prisma.blog.update({
			where: { id: id },
			data: body,
		});
		if (blog) {
			return c.json({
				status: 200,
				message: "blog updated successfully",
			});
		}
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while updating todo status",
		});
	}
});

blogRouter.delete("/deleteBlog/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const id = c.req.param("id");
		const blog = await prisma.blog.delete({
			where: { id: id },
		});
		if (blog) {
			return c.json({
				status: 200,
				message: "blog deleted successfully",
			});
		}
	} catch (error) {
		return c.json({
			status: 500,
			message: "error while updating todo status",
		});
	}
});
