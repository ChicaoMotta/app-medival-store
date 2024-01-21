import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';


chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Será validado que é possível listar todos as orders com sucesso', async () => {
    const ordersRefactored = [
      {
        "id": 1,
        "userId": 1,
        "productIds": [
          2,
          1
        ]
      },
      {
        "id": 2,
        "userId": 3,
        "productIds": [
          4,
          3
        ]
      },
      {
        "id": 3,
        "userId": 2,
        "productIds": [
          5
        ]
      }
    ]

    const orderModelMock = [
      {
        id: 1,
        userId: 1,
        productIds: [{id: 2, name: 'teste', orderId: 1, price: 'asfsd'},{
        id: 1, name: 'teste', orderId: 1, price: 'asfsd'}]
      },
      {
        id:2,
        userId: 3,
        productIds: [{id: 4, name: 'teste', orderId: 1, price: 'asfsd'},{
          id: 3, name: 'teste', orderId: 1, price: 'asfsd'}]
      },
      {
        id:3,
        userId: 2,
        productIds: [{id: 5, name: 'teste', orderId: 1, price: 'asfsd'}]
      },
    ]
    const orderModel = OrderModel.bulkBuild(orderModelMock, {include: {model: ProductModel, as: 'productIds'}})
    sinon.stub(OrderModel, 'findAll').resolves(orderModel)
    const result = await chai.request(app).get('/orders');

    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(ordersRefactored);
  });

});
