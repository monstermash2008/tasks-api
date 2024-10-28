import { OpenAPIHono } from "@hono/zod-openapi";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import env from "../env.js";
export function createRouter() {
    return new OpenAPIHono({
        strict: false,
        defaultHook,
    });
}
export default function createApp() {
    const app = createRouter();
    app.use(serveEmojiFavicon("📝"));
    app.use(pinoLogger({
        pino: pino({ level: env.LOG_LEVEL || "info" }, env.NODE_ENV === "production" ? undefined : pretty()),
        http: {
            reqId: () => crypto.randomUUID(),
        },
    }));
    app.notFound(notFound);
    app.onError(onError);
    return app;
}
export function createTestApp(router) {
    const testApp = createApp();
    testApp.route("/", router);
    return testApp;
}
