import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
/* load environment variables without requiring types for dotenv */
require("dotenv").config();
import { eventRouter } from "./routes/event.routes";

interface AppInterface {
  startServer(): Promise<void>;
}

export class App implements AppInterface {
  private readonly port: number;
  public app: Application;

  constructor() {
    this.port = Number(process.env.PORT) || 4000;
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public async startServer(): Promise<void> {
    await this.connectDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private async connectDatabase(): Promise<void> {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventdb";

    try {
      await mongoose.connect(uri);
      console.log("Database connected");
    } catch (err) {
      console.error("Failed to connect to database", err);
      process.exit(1);
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.get("/", (_req: Request, res: Response) => {
      res.json({ message: "Event Management API (OOP + TS)" });
    });

    this.app.use("/api/events", eventRouter);
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err);
        const status = err.statusCode || 400;
        res.status(status).json({ success: false, message: err.message || "Something went wrong" });
      }
    );
  }
}