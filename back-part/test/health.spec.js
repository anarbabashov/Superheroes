const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');

chai.should();

chai.use(chaiHttp);

describe('Server should be healthy', () => {
  it('it should GET health', done => {
    chai.request(server).get('/health').end((err, res) => {
      res.should.have.status(200);
      res.should.be.a('object');
      res.body.should.have.property('status').eql('UP');
      done();
    })
  })
})