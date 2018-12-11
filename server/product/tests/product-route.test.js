/* eslint-disable no-unused-expressions */
/* global beforeEach afterEach describe it:true */
/* eslint no-undef: "error" */

const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const route = require("./../product-route");
const controller = require("./../product-controller");

let app;

chai.should();
chai.use(sinonChai);

beforeEach(() => {
  app = express();
  app.use("/", route);
});

describe("product-route.js", () => {
  describe("#GET /", () => {
    const getProducts = sinon.stub(controller, "getProducts");

    afterEach(() => {
      getProducts.reset();
    });

    describe("when request has params", () => {
      it("should get products with request params", async () => {
        const query = {
          keywods: ["foo", "bar"],
          offset: 1,
          limit: 20
        };
        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(query);
      });
    });

    describe("when request has no params", () => {
      it("should get products with only default pagination", async () => {
        const expectedFilter = {
          offset: 0,
          limit: 100
        };
        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query({})
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when request has valid pagination params", () => {
      it("should get products with request pagination params", async () => {
        const query = {
          offset: 5,
          limit: 15
        };
        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(query);
      });
    });

    describe("when request has invalid offset param", () => {
      it("should get products with default offset param", async () => {
        const query = {
          offset: "offset",
          limit: 30
        };
        const expectedFilter = {
          offset: 0,
          limit: 30
        };

        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when request has negative offset param", () => {
      it("should get products with default offset param", async () => {
        const query = {
          offset: -5,
          limit: 30
        };
        const expectedFilter = {
          offset: 0,
          limit: 30
        };

        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when request has invalid limit param", () => {
      it("should get products with default limit param", async () => {
        const query = {
          offset: 5,
          limit: "limit"
        };
        const expectedFilter = {
          offset: 5,
          limit: 100
        };

        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when request has negative limit param", () => {
      it("should get products with default limit param", async () => {
        const query = {
          offset: 5,
          limit: -10
        };
        const expectedFilter = {
          offset: 5,
          limit: 100
        };

        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when request has zero limit param", () => {
      it("should get products with default limit param", async () => {
        const query = {
          offset: 5,
          limit: 0
        };
        const expectedFilter = {
          offset: 5,
          limit: 100
        };

        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when request has limit param greater than maximum allowed", () => {
      it("should get products with default limit param", async () => {
        const query = {
          offset: 5,
          limit: 500
        };
        const expectedFilter = {
          offset: 5,
          limit: 100
        };

        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        await request(app)
          .get("/")
          .query(query)
          .expect(200);

        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(expectedFilter);
      });
    });

    describe("when getting products is successful", () => {
      it("should return status code 200", async () => {
        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        const res = await request(app)
          .get("/")
          .expect(200);

        getProducts.should.be.calledOnce;
        res.status.should.be.equal(200);
      });

      it("should return products", async () => {
        it("should return status code 200", async () => {
          const products = [{ name: "product foo" }, { name: "product bar" }];

          const res = await request(app)
            .get("/")
            .expect(200);

          getProducts.should.be.calledOnce;
          res.body.should.be.deep.equal(products);
        });
      });
    });

    describe("when error occurs in getting products", () => {
      it("should call next middleware with the error", async () => {
        const error = new Error("failed");
        getProducts.rejects(error);

        /* eslint-disable-next-line no-unused-vars */
        app.use((err, req, res, next) => {
          err.should.be.deep.equal(error);
          res.send();
        });

        await request(app).get("/");
      });
    });
  });

  describe("#GET /:id", () => {
    const getProduct = sinon.stub(controller, "getProduct");

    afterEach(() => {
      getProduct.reset();
    });

    describe("when product is found", () => {
      it("should return status code 200", async () => {
        const product = { name: "product foo" };

        getProduct.resolves(product);

        const res = await request(app)
          .get("/id")
          .expect(200);

        res.status.should.be.equal(200);
        getProduct.should.be.calledOnce;
      });

      it("should return product", async () => {
        const product = { name: "product foo" };

        getProduct.resolves(product);

        const res = await request(app)
          .get("/id")
          .expect(200);

        res.body.should.be.deep.equal(product);
        getProduct.should.be.calledOnce;
      });
    });

    describe("when product is not found", () => {
      it("should return 404", async () => {
        getProduct.resolves();

        await request(app)
          .get("/id")
          .expect(404);

        getProduct.should.be.calledOnce;
      });
    });

    describe("when error occurs", () => {
      it("should call next middleware with the error", async () => {
        const error = new Error("failed");
        getProduct.rejects(error);

        /* eslint-disable-next-line no-unused-vars */
        app.use((err, req, res, next) => {
          err.should.be.deep.equal(error);
          res.send();
        });

        await request(app).get("/id");
      });
    });
  });
});
