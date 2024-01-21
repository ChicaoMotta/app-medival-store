import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Será validado que é possível listar todos os produtos com sucesso', async () => {
    const products = [
      {
        id: 1,
        name: 'Excalibur',
        price: '10 peças de ouro',
        orderId: 1
      },
      {
        id: 2,
        name: 'Espada Justiceira',
        price: '20 peças de ouro',
        orderId: 1
      },
      {
        id: 3,
        name: 'Lira de Orfeu',
        price: '1 peça de ouro',
        orderId: 2
      },
      {
        id: 4,
        name: 'Armadura de Aquiles',
        price: '1 peça de ouro',
        orderId: 2
      },
      {
        id: 5,
        name: 'Harpa de Dagda',
        price: '15 peças de ouro',
        orderId: 3
      }
    ];
    const prodModel = ProductModel.bulkBuild(products)
    sinon.stub(ProductModel, 'findAll').resolves(prodModel)
    const result = await chai.request(app).get('/products');

    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(products);
  });

});
