import createApp from "./lib/create-app.js";
import index from "./routes/index.route.js";
import tasks from "./routes/tasks/tasks.index.js";
import configureOpenAPI from "./lib/configure-open-api.js";
const app = createApp();
const routes = [
    index,
    tasks,
];
configureOpenAPI(app);
routes.forEach((route) => {
    app.route("/", route);
});
export default app;
