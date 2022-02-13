import { Router, Request, Response } from 'express';
import ProductStore from '../models/product';

const products = Router();
const productStore = new ProductStore();

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productStore.index();
    res.send(products);
  } catch (err) {
    res.status(500)
    res.send(`Could not get products. Error: ${err}`);
    console.log(`Could not get products. Error: ${err}`);
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await productStore.show(id);
    res.send(product);
  } catch (err) {
    res.status(500)
    res.send(`Could not find product with ${id}. Error: ${err}`);
    console.log(`Could not find product with ${id}. Error: ${err}`);
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, category } = req.body
  try {
    const product = await productStore.add(name, price, category);
    res.send(product);
  } catch (err) {
    res.status(500)
    res.send(`Could not add new product ${name}. Error: ${err}`);
    console.log(`Could not add new product ${name}. Error: ${err}`);
  }
};



products.get('/', getAllProducts);
products.get('/:id', getProduct);
products.post('/', addProduct);

export default products;