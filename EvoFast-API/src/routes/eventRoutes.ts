import { Router } from 'express';
import { PublishEvents, ActiveEvents } from '../controllers/EventsController';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/PublishEvents', upload.single('imagemEvento'), PublishEvents)
router.get('/ActiveEvents',ActiveEvents)

export default router   