import { Hono } from "hono";
import UserController from "@/internal/controllers/user.controller";


const user = new UserController();

const router = new Hono();

router.get('/users', user.get);
router.post('/users', user.create);
router.get('/users/:id', user.getById);
router.put('/users/:id', user.update);
router.delete('/users/:id', user.delete);

export default router;