"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
async function bootstrap() {
    const app = new app_1.App();
    await app.startServer();
}
bootstrap().catch((err) => {
    console.error("Failed to start application", err);
    process.exit(1);
});
