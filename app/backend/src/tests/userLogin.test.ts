import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import generatorJWT from '../helpers/generatorJWT';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa as possibilidades da rota "/login"', () => {
  describe('Verifica falha no login', () => {
    it('O retorno deve ser "400" quando o campo "email" não é passado', async () => {
      const response = await chai.request(app).post('/login')
      .send({
        email: '',
        password: 'secret_admin'
      });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('O retorno deve ser "400" quando o campo "password" não é passado', async () => {
      const response = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', });
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('O retorno do status ao passar um email inválido deve ser "401"', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
      const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
      sinon.restore();
    });
    it('O retorno do status ao passar uma senha inválida deve ser "401"', async () => {
      sinon.stub(UserModel, 'findOne').resolves({
        email: 'admin@admin.com', password: 'sadgjsadhahsxas'
      } as any);
      const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret@_teste',
      });
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
      sinon.restore();
    });
  });
  describe('Verifica o sucesso do login', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne')
        .resolves({ email: 'admin@admin.com', password: 'secrect_admin'} as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
    });
    afterEach(sinon.restore);
    it('O retorno do status deve ser "200"', async () => {
      const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      expect(response.status).to.be.equal(200);
    });
    it('O retorno deve ser o token', async () => {
      sinon.stub(generatorJWT, 'generateToken').resolves('token');
      const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      expect(response.body).to.deep.equal({ token: 'token'});
    });
  });
});

describe('Testa possibilidades da rota "/login/validate"', () => {
  describe('Verifica a falha na rota', () => {
    it('O retorno do status "401" quando tenta acessar sem token', async () => {
      const response = await chai.request(app).get('/login/validate').send();
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token not found' });
    });
    it('O retorno do status "401" quando tenta acessar com token inválido', async () => {
      const response = await chai.request(app).get('/login/validate')
        .send().set('Authorization', 'token');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
  describe('Verifica casos de sucessos', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne')
      .resolves({ email: 'admin@admin.com', password: 'secrect_admin'} as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(generatorJWT, 'generateToken')
      .resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NjEwOTczfQ.TLub2yP8JKI7NsJZkCul9AwXBpZNKoreHDcnazrY8S8')
    });
    afterEach(sinon.restore);
    it('O retorno do status deve ser o "200"', async () => {
      const responseLogin = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      const { token } = responseLogin.body;
      const response = await chai.request(app).get('/login/validate')
      .send().set('Authorization', token);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ role: 'admin' });
    });
  });
});
