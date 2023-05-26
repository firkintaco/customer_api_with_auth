const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app");
const should = chai.should();
const { deleteAllCustomers } = require("../controllers/customer");

chai.use(chaihttp);

const testUser = {
  firstName: "Testi",
  lastName: "Ukko",
  email: "testi@ukko.domain",
  phone: "040666777",
};

describe("/POST /api/customers", () => {
  beforeEach((done) => {
    deleteAllCustomers();
    done();
  });
  it("Add test user", (done) => {
    chai
      .request(app)
      .post("/api/customers")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testUser))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("email");
        done();
      });
  });
});

describe("/GET /api/customers", () => {
  it("Fetch all customers", (done) => {
    chai
      .request(app)
      .get("/api/customers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
