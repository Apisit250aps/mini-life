import { Hono } from "hono";
import UserController from "@/internal/controllers/user.controller";
import CardController from "@/internal/controllers/card.controller";


const user = new UserController();
const card = new CardController();

const router = new Hono();

router.get('/users', user.get);
router.post('/users', user.create);
router.get('/users/:id', user.getById);
router.put('/users/:id', user.update);
router.delete('/users/:id', user.delete);

router.get('/cards', card.get);
router.post('/cards', card.create);
router.get('/cards/:id', card.getById);
router.put('/cards/:id', card.update);
router.delete('/cards/:id', card.delete);

export default router;