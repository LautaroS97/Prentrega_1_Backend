import express from 'express';
import productRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static('public'));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use('/', (req, res) => res.send('Home'));

const server = app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

export default server;