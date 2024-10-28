import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import db from "../../db/index.js";
import { tasks } from "../../db/schema.js";
export const list = async (c) => {
    const tasks = await db.query.tasks.findMany();
    return c.json(tasks);
};
export const create = async (c) => {
    const task = c.req.valid("json");
    const [inserted] = await db.insert(tasks).values(task).returning();
    return c.json(inserted, HttpStatusCodes.OK);
};
export const getOne = async (c) => {
    const { id } = c.req.valid("param");
    const task = await db.query.tasks.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        },
    });
    if (!task) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json(task, HttpStatusCodes.OK);
};
export const patch = async (c) => {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");
    const [task] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    if (!task) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json(task, HttpStatusCodes.OK);
};
export const remove = async (c) => {
    const { id } = c.req.valid("param");
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    if (result.rowsAffected === 0) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }
    return c.body(null, HttpStatusCodes.NO_CONTENT);
};
