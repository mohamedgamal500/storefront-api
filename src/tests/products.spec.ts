import ProductStore from "../models/product";


const productStore = new ProductStore();

describe('Product Model', () => {
    it('test create new product', async () => {
        const product = await productStore.create('blue toy', 400, 'toys');
        expect(product).toEqual({
            id: product.id,
            name: 'blue toy',
            price: 400,
            category: 'toys'
        });
    });

    it('test get single product', async () => {
        const createdProduct = await productStore.create('green toy', 500, 'toys');
        const productInDb = await productStore.show(String(createdProduct.id));
        expect(productInDb).toEqual(createdProduct);
    });


    it('test get all products', async () => {
        const createdProduct = await productStore.create('red toy', 880, 'toys');
        const products = await productStore.index();
        expect(products).toContain(createdProduct);
    });



});
