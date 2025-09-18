import { Router } from 'express';
import { createSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } from '../controllers/sweetsController';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = Router();

router.post('/', auth, createSweet);
router.get('/', getSweets);
router.get('/search', searchSweets);
router.put('/:id', auth, updateSweet);
router.delete('/:id', auth, admin, deleteSweet);
router.post('/:id/purchase', auth, purchaseSweet);
router.post('/:id/restock', auth, admin, restockSweet);

export default router;
