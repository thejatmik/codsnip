require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');
const chaiLike = require('chai-like');
const axios = require('axios').default;
const {Snippet} = require('../models/index.js');

chai.use(chaiHttp);
chai.use(chaiThings);
chai.use(chaiLike);
const expect = chai.expect;


describe('SNIPS API', () => {
  const userApiHost = process.env.USER_API_HOST;
  const userApiPort = process.env.USER_API_PORT;
  let apiServer;
  let accessToken;
  let userObj = {};
  let item01 = {};
  let item02 = {};
  before((done) => {
    Snippet.destroy({
      where: {},
    })
      .then((_) => {
        return axios.post(`http://${userApiHost}:${userApiPort}/login`, {name: 'user00', password: 'leleyeye'});
      })
      .then((res) => {
        accessToken = ''+res.data.accessToken;
        userObj = {...res.data.user};
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
        }
      })
      .finally((_) => {
        apiServer = require('../server.js');
        done();
      });
  });

  describe('Create new snippets POST /newSnips', () => {
    it('should return created item, user, and token, with desc', (done) => {
      chai.request(apiServer)
        .post('/newSnips')
        .set('accessToken', accessToken)
        .type('form')
        .send({
          title: 'test01',
          code: 'hello world',
          description: 'hellow',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('accessToken');
          expect(res.body).to.have.property('created');
          expect(res.body.user.id).to.deep.equal(userObj.id);
          expect(res.body.accessToken).to.be.a('string');
          expect(res.body.created).to.have.property('id');
          expect(res.body.created).to.have.property('title');
          expect(res.body.created).to.have.property('code');
          expect(res.body.created).to.have.property('description');
          expect(res.body.created.description).to.be.a('string');
          userObj = {...res.body.user};
          accessToken = ''+res.body.accessToken;
          item01 = {...res.body.created};
          done();
        });
    });

    it('should return created item, user, and token, null desc', (done) => {
      chai.request(apiServer)
        .post('/newSnips')
        .set('accessToken', accessToken)
        .type('form')
        .send({
          title: 'test01',
          code: 'hello world',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('accessToken');
          expect(res.body).to.have.property('created');
          expect(res.body.user.id).to.deep.equal(userObj.id);
          expect(res.body.accessToken).to.be.a('string');
          expect(res.body.created).to.have.property('id');
          expect(res.body.created).to.have.property('title');
          expect(res.body.created).to.have.property('code');
          expect(res.body.created).to.have.property('description');
          expect(res.body.created.description).to.deep.equal(null);
          userObj = {...res.body.user};
          accessToken = ''+res.body.accessToken;
          item02 = {...res.body.created};
          done();
        });
    });

    it('return error: title and code field empty', (done) => {
      chai.request(apiServer)
        .post('/newSnips')
        .set('accessToken', accessToken)
        .type('form')
        .send({
          title: '',
          code: '',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.a('array');
          expect(res.body.errors).that.does.includes('title cannot be empty');
          expect(res.body.errors).that.does.includes('code cannot be empty');
          done();
        });
    });

    it('return error: no token id', (done) => {
      chai.request(apiServer)
        .post('/newSnips')
        .type('form')
        .send({
          dummy: 'value',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('unauthorized');
          done();
        });
    });
  });

  describe('Get snippet info by id /snips/:id', () => {
    it('return item01', (done) => {
      chai.request(apiServer)
        .get(`/snips/${item02.id}`)
        .set('accessToken', accessToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('snippet');
          expect(res.body.snippet).to.deep.equal(item02);
          done();
        });
    });

    it('return item01', (done) => {
      chai.request(apiServer)
        .get(`/snips/${item01.id}`)
        .set('accessToken', accessToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('snippet');
          expect(res.body.snippet).to.deep.equal(item01);
          done();
        });
    });

    it('return error: invalid id', (done) => {
      chai.request(apiServer)
        .get('/snips/0')
        .set('accessToken', accessToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('snippet id not found');
          done();
        });
    });
  });

  describe('get all snippets /allSnip', () => {
    it('return array of snippets', (done) => {
      chai.request(apiServer)
        .get('/allSnip')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('snippets');
          expect(res.body.snippets).to.be.a('array');
          expect(res.body.snippets).to.include.something.that.deep.equal(item01);
          expect(res.body.snippets).to.include.something.that.deep.equal(item02);
          done();
        });
    });
  });

  describe('update snippet PATCH /snips/:id', () => {
    it('should add new field to snippet id', (done) => {
      const itemObj = {
        description: 'some description no title no code',
      };
      const newItem = {
        ...item01,
        description: itemObj.description,
      };
      delete newItem.updatedAt;
      chai.request(apiServer)
        .patch(`/snips/${newItem.id}`)
        .set('accessToken', accessToken)
        .type('form')
        .send(itemObj)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('updated');
          expect(res.body.updated).to.like(newItem);
          done();
        });
    });

    it('return error: invalid snippet id', (done) => {
      const editedSnip = {...item01};
      delete editedSnip.id;
      delete editedSnip.createdAt;
      delete editedSnip.updatedAt;
      chai.request(apiServer)
        .patch('/snips/0')
        .set('accessToken', accessToken)
        .type('form')
        .send(editedSnip)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('snippet id not found');
          done();
        });
    });

    it('return error: invalid access token', (done) => {
      const itemObj = {
        title: item01.title,
        code: item01.code,
        description: item01.description,
      };
      chai.request(apiServer)
        .patch(`/snips/${itemObj.id}`)
        .set('accessToken', 'notaccesstoken')
        .type('form')
        .send(itemObj)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('unauthorized');
          done();
        });
    });

    it('return error: no access token', (done) => {
      const itemObj = {
        title: item01.title,
        code: item01.code,
        description: item01.description,
      };
      chai.request(apiServer)
        .patch(`/snips/${itemObj.id}`)
        .type('form')
        .send(itemObj)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('unauthorized');
          done();
        });
    });
  });

  describe('delete snippet DELETE /snips/:id', () => {
    it('should delete snippet, return number of deleted snippet', (done) => {
      chai.request(apiServer)
        .del(`/snips/${item01.id}`)
        .set('accessToken', accessToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('deleted');
          expect(res.body.deleted).to.be.a('number');
          expect(res.body.deleted).to.equal(1);
          done();
        });
    });

    it('return error: invalid snippet id', (done) => {
      chai.request(apiServer)
        .del('/snips/0')
        .set('accessToken', accessToken)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('snippet id not found');
          done();
        });
    });

    it('return error: invalid access token', (done) => {
      chai.request(apiServer)
        .del(`/snips/${item01.id}`)
        .set('accessToken', 'someinvalidaccesstoken')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('unauthorized');
          done();
        });
    });

    it('return error: no access token', (done) => {
      chai.request(apiServer)
        .del(`/snips/${item01.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('unauthorized');
          done();
        });
    });
  });
});
