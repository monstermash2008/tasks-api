import { testClient } from "hono/testing";
/* eslint-disable ts/ban-ts-comment */
import { describe, expect, expectTypeOf, it } from "vitest";
import createApp, { createTestApp } from "../../lib/create-app.js";
import router from "./tasks.index.js";
describe("tasks list", () => {
    it("responds with an array", async () => {
        const testApp = createTestApp(router);
        const response = await testApp.request("/tasks");
        const result = await response.json();
        // @ts-expect-error
        expectTypeOf(result).toBeArray();
    });
    it("responds with an again array", async () => {
        const client = testClient(createApp().route("/", router));
        const response = await client.tasks.$get();
        const json = await response.json();
        expectTypeOf(json).toBeArray();
    });
    it("validates the id param", async () => {
        const client = testClient(createApp().route("/", router));
        const response = await client.tasks[":id"].$get({
            param: {
                id: "wat",
            },
        });
        expect(response.status).toBe(422);
    });
});
