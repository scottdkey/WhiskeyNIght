process.env.NODE_ENV = 'test'
process.env.PORT = "9000"
import server from "../src/index"

import chai from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp)
const should = chai.should()
describe('routes: index', () => {
  it('should return application/json', (done) => {
    chai.request(server).get('/').end((err, res) => {
      should.not.exist(err)
      res.status.should.eql(200)
      res.type.should.eql("application/json")
      res.body.message.should.equal('Working')
      done()
    })
  })
  it('should verify correct response', (done) => {
    chai.request(server).get('/test').end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(200);
      res.type.should.eql('application/json');
      res.body.message.should.equal("Test")
      done()
    })
  })
})

