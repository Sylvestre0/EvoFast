import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/login', login)
router.post('/register',register)
router.get('/test', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

export default router;