import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/MatchesModel'; 
const { expect } = chai;
import allMatches from './moks/allMatches';
import matchesProgress from './moks/matchesProgress';
import matchesNotProgress from './moks/matchesNotProgress';

describe('Testa casos da rota "/matches"', () => {
  it('Verifica se todas as partidas são retornada quando chama o endpoint "/matches"', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allMatches);
  });
  it('Verifica se retorna as partidas em aberto "/matches?inProgress=true"', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesProgress);
  });
  it('Verifica se retorna todas partidas encerradas "/matches?inProgress=false"', async () => {
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesNotProgress);
  });
  it('Verifica se insere uma partida com sucesso "/matches"', async () => {
    sinon.stub(Matches,'create').resolves({
      id:1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as Matches)
    const responseLogin = await chai.request(app).post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'});
    const response = await chai.request(app).
    post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization',responseLogin.body.token);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal({id:1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,});
  });
  it('Verifica se é possível alterar o status inProgress de uma partida que esteja em andamento "/match/:id/finish', async () => {
    sinon.stub(Matches,'update').resolves(null as any);
    const response = await chai.request(app).
    patch('/matches/48/finish');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({message: 'Finished'});
    sinon.restore();
  });
  it('Verifica se é possível atualizar uma partida em andamento ao passar o id da partida "/matches/:id"', async () => {
    sinon.stub(Matches,'update').resolves(null as any);
    const response = await chai.request(app).
    patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({message: 'Score Updated'});
    sinon.restore();
  });
  it('Verifica se é possível inserir uma partida ao passar um time que não existe', async () => {
    const responseLogin = await chai.request(app).post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'});
    const response = await chai.request(app).
    post('/matches').send({
      "homeTeam": 99999,
      "awayTeam": 88888, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization',responseLogin.body.token);
    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: "There is no team with such id!" });
  });
  it('Verifica o erro retornado ao inserir uma partida com times iguais', async () => {
    const responseLogin = await chai.request(app).post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'});
    const response = await chai.request(app).
    post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 16, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization',responseLogin.body.token);
    expect(response.status).to.be.equal(422);
    expect(response.body).to.deep.equal({message: "It is not possible to create a match with two equal teams"});
  });
  it('Verifica se é possível inserir uma nova partida quando não se passa um token', async () => {
    const httpResponse = await chai.request(app).post('/matches').send({
      "homeTeam": 99999,
      "awayTeam": 88888, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    });
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Token not found'});
  });
  // it('', async () => {

  // });
  // it('', async () => {

  // });
  // it('', async () => {

  // });
  // it('', async () => {

  // });
});