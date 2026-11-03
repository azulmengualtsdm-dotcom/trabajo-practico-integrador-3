import cookieParser from "cookie-parser";
import Express from "express";
import cors from "cors";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.route.js";
import { categoryRouter } from "./src/routes/category.route.js";
import { eventRouter } from "./src/routes/event.route.js";
import { userRouter } from "./src/routes/user.route.js";

const app = Express();

const port = process.env.PORT || 3306;
app.use(cors());
app.use(Express());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", eventRouter);
app.use("/api", userRouter);

app.listen(port, async () => {
  try {
    await startDB();
    console.log("servidor encendido");
  } catch (error) {
    console.log("error al encender el servidor");
  }
});
