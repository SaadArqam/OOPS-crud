"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
/* load environment variables without requiring types for dotenv */
require("dotenv").config();
const event_routes_1 = require("./routes/event.routes");
class App {
    constructor() {
        this.port = Number(process.env.PORT) || 4000;
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    async startServer() {
        await this.connectDatabase();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    async connectDatabase() {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventdb";
        try {
            await mongoose_1.default.connect(uri);
            console.log("Database connected");
        }
        catch (err) {
            console.error("Failed to connect to database", err);
            process.exit(1);
        }
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
    }
    initializeRoutes() {
        this.app.get("/", (_req, res) => {
            res.json({ message: "Event Management API (OOP + TS)" });
        });
        this.app.use("/api/events", event_routes_1.eventRouter);
    }
    initializeErrorHandling() {
        this.app.use((err, _req, res, _next) => {
            console.error(err);
            const status = err.statusCode || 400;
            res.status(status).json({ success: false, message: err.message || "Something went wrong" });
        });
    }
}
exports.App = App;
