const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const {User} = require('../models/index.js');

describe('USERS API', () => {
  let userPayload = {};
  let accessToken = '';
  describe('POST /register', () => {
    let apiServer;
    before((done) => {
      // remove all users
      // new mocha: return promise, and mocha will wait
      User.destroy({
        where: {},
      })
        .finally((_) => {
          apiServer = require('../app.js');
          done();
        });
    });

    it('return error: username validation', (done) => {
      chai.request(apiServer)
        .post('/register')
        .type('form')
        .send({
          'name': 'use',
          'password': 'leleyeye',
        })
        .end((err, res) => {
          expect(err).to.be.null;

          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.a('array');
          expect(res.body.errors)
            .that.does.include('insufficient username length');

          done();
        });
    });

    it('return error: password validation', (done) => {
      chai.request(apiServer)
        .post('/register')
        .type('form')
        .send({
          'name': 'user01',
          'password': 'sho',
        })
        .end((err, res) => {
          expect(err).to.be.null;

          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.a('array');
          expect(res.body.errors)
            .that.does.include('insufficient password length');

          done();
        });
    });

    it('return error: empty input', (done) => {
      chai.request(apiServer)
        .post('/register')
        .type('form')
        .send({
          'name': 'useremptypass',
          'password': '',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res).to.have.property('error');
          expect(res.error).to.have.property('text');
          expect(res.error.text).to.be.a('string');
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('bad request');
          done();
        });
    });

    it('should return jwt as registered successfully', (done) => {
      chai.request(apiServer)
        .post('/register')
        .type('form')
        .send({
          'name': 'user01',
          'password': 'leleyeye',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);

          expect(res.body).to.be.a('object');

          expect(res.body).to.have.property('accessToken');
          expect(res.body.accessToken).to.be.a('string');

          expect(res.body).to.have.property('user');
          expect(res.body.user).to.be.a('object');

          done();
        });
    });

    it('return error: name already used', (done) => {
      chai.request(apiServer)
        .post('/register')
        .type('form')
        .send({
          'name': 'user01',
          'password': 'leleyeye',
        })
        .end((err, res) => {
          expect(err).to.be.null;

          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.a('array');
          expect(res.body.errors).that.does.include('name must be unique');

          done();
        });
    });
  });

  describe('POST /login', () => {
    let apiServer;
    before((done) => {
      apiServer = require('../app.js');
      done();
    });

    it('should return jwt token and user payload', (done) => {
      chai.request(apiServer)
        .post('/login')
        .type('form')
        .send({
          'name': 'user01',
          'password': 'leleyeye',
        })
        .end((err, res) => {
          expect(err).to.be.null;

          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('accessToken');
          expect(res.body).to.have.property('user');
          expect(res.body.accessToken).to.be.a('string');
          expect(res.body.user).to.be.a('object');
          expect(res.body.user).to.have.property('name');
          expect(res.body.user).to.have.property('id');

          userPayload = {...res.body.user};
          accessToken = ''+res.body.accessToken;
          done();
        });
    });

    it('return error: wrong password', (done) => {
      chai.request(apiServer)
        .post('/login')
        .type('form')
        .send({
          'name': 'user01',
          'password': 'wrongpass',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.deep.equal('wrong username/pass');
          done();
        });
    });

    it('return error: username not found', (done) => {
      chai.request(apiServer)
        .post('/login')
        .type('form')
        .send({
          'name': 'user02',
          'password': 'leleyeye',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.deep.equal('username not found');
          done();
        });
    });

    it('return error: empty username or password', (done) => {
      chai.request(apiServer)
        .post('/login')
        .type('form')
        .send({
          'name': '',
          'password': '',
        })
        .end((err, res) => {
          expect(err).to.be.null;

          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.deep.equal('user/password cannot be empty');
          done();
        });
    });
  });

  describe('POST /checkToken', () => {
    let apiServer;
    before(() => {
      // user01 from previous test
      apiServer = require('../app.js');
    });

    it('return user payload and new jwt token', (done) => {
      chai.request(apiServer)
        .get('/checkToken')
        .set('accessToken', accessToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('accessToken');
          expect(res.body.user).to.be.a('object');
          expect(res.body.user).to.have.property('name');
          expect(res.body.user.name).to.be.a('string');
          expect(res.body.user).to.have.property('id');
          expect(res.body.accessToken).to.be.a('string');
          done();
        });
    });

    it('return error: invalid token', (done) => {
      chai.request(apiServer)
        .get('/checkToken')
        .set('accessToken', 'anystringnotrepresentingtoken')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('invalid token');
          done();
        });
    });

    it('return error: no token found on request', (done) => {
      chai.request(apiServer)
        .get('/checkToken')
        .set('accessToken', '')
        .end((err, res) => {
          expect(err).to.be.null;

          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('token not found');
          done();
        });
    });
  });

  describe('GET /healthCheck', () => {
    let apiServer;

    beforeEach(() => {
      apiServer = require('../app.js');
    });

    it('should return server time and database connection status', (done) => {
      chai.request(apiServer)
        .get('/healthCheck')
        .end((err, res) => {
          const serverTime = new Date(res.body.time);

          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.a('object');

          expect(res.body).to.have.property('time');
          expect(res.body.time).to.be.a('string');
          expect(serverTime.getDate()).to.not.be.NaN;
          expect(serverTime.getMonth()).to.not.be.NaN;
          expect(serverTime.getFullYear()).to.not.be.NaN;

          expect(res.body).to.have.property('dbStatus');
          expect(res.body.dbStatus).to.be.a('string');
          expect(res.body.dbStatus).to.deep.equal('USER_DB_OK');

          done();
        });
    });
  });
});
