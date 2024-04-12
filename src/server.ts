import express from "express";
import cors from "cors";

import usersRoutes from "./routes/usersRoutes";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

