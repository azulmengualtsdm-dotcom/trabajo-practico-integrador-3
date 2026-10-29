import cookieParser from "cookie-parser";
import Express from "express";
import cors from "cors";
import { startDB } from "./src/config/database.js";

const app = Express();

const port = process.env.PORT || 3306;
app.use(cors());
app.use(Express());
app.use(cookieParser());

app.listen(port, async () => {
  try {
    await startDB();
    console.log("servidor encendido");
  } catch (error) {
    console.log("error al encender el servidor");
  }
});
