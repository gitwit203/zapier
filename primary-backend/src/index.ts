import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import cors from "cors";
<<<<<<< HEAD
import { triggerRouter } from "./router/trigger";
import { actionRouter } from "./router/action";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.use("/api/v1/trigger", triggerRouter);

app.use("/api/v1/action", actionRouter);

app.listen(3000);
=======
const app = express();


app.use(express.json());
app.use(cors());

//app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/zap",zapRouter);


app.listen(3001,()=> console.log("Server running on port 3001"));
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
