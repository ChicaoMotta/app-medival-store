import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs'

chai.use(chaiHttp);

const validUserName = 'Tiaguin'
const validPassword = 'SecretPassword'
const invalidUserName = 'oiamigo'
const invalidPassord = 'oidenovo'

describe('Post /login', function () {
  beforeEach(function () { sinon.restore(); });

  it('login successful', async function () {

   const encrypetedPassword = bcrypt.hashSync(validPassword, 10);
    const mockedUser = UserModel.bulkBuild([{
      username: validUserName,
      vocation: 'Guerreiro',
      level: 10,
      password: encrypetedPassword
    }])
    sinon.stub(UserModel, 'findAll').resolves(mockedUser);

    const result =  await chai.request(app).post('/login').send({
      username: validUserName,
      password: validPassword
    })
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.key('token');
  });
  it('invalid login, no password', async function () {
    const result = await chai.request(app).post('/login').send({
      username: validUserName,
    })

    expect(result.status).to.equal(400)
    expect(result.body).to.deep.equal({message: '"username" and "password" are required'})
  })
  it('invalid login, no username', async function () {
    const result = await chai.request(app).post('/login').send({
      password: validPassword,
    })

    expect(result.status).to.equal(400)
    expect(result.body).to.deep.equal({message: '"username" and "password" are required'})
  })
  it('invalid login, invalid username', async function () {
    sinon.stub(UserModel, 'findAll').resolves([])
    const result = await chai.request(app).post('/login').send({
      username: invalidUserName,
      password: validPassword,
    })
    

    expect(result.status).to.equal(401)
    expect(result.body).to.deep.equal({message: 'Username or password invalid'})
  })
  it('invalid login, invalid password', async function () {
    const userMock = UserModel.bulkBuild([{
      username: validUserName,
      vocation: 'Guerreiro',
      level: 10,
      password: validPassword,
    }])
    sinon.stub(UserModel, 'findAll').resolves(userMock);
    const result = await chai.request(app).post('/login').send({
      username: validUserName,
      password: invalidPassord,
    })

    expect(result.status).to.equal(401)
    expect(result.body).to.deep.equal({message: 'Username or password invalid'})
  })
});
