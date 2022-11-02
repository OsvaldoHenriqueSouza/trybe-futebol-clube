import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;
import allTeams from './moks/allTemas';
import team from './moks/team';

describe('Testa casos da rota "/teams"', () => {
  it('Verifica casos de sucesso da rota "/teams"', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response).to.deep.equal(allTeams);
  });
  it('', async () => {
    const response = await chai.request(app).get('/teams/12');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(team)
  });
});
