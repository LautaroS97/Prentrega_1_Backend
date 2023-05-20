import { Router } from 'express';
import CartManager from '../manager/cartManager.js';

const cartManager = new CartManager('carts.json');
const router = Router();

router.get('/', async (req, res) => {
  const carts = await cartManager.get();
  res.json({ carts });
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const cart = await cartManager.getById(id);
  res.json({ cart });
});

router.post('/', async (req, res) => {
  const newCart = await cartManager.create();
  res.json({ status: 'success', newCart });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = await cartManager.addProduct(cartId, productId);

  res.json({ status: 'success', cart });
});

export default router;