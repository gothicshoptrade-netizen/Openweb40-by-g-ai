import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import formRouter from "./form";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(formRouter);

export default router;
