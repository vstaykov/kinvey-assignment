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
    const getAllProducts = sinon.stub(controller, "getAllProducts");
    const getProducts = sinon.stub(controller, "getProducts");

    afterEach(() => {
      getAllProducts.reset();
      getProducts.reset();
    });

    describe("when request has query params", () => {
      it("should return queried products", async () => {
        const query = { keywods: ["foo", "bar"] };
        const products = [{ name: "product foo" }, { name: "product bar" }];

        getProducts.resolves(products);

        const res = await request(app)
          .get("/")
          .query(query)
          .expect(200);

        res.body.should.be.deep.equal(products);
        getProducts.should.be.calledOnce;
        getProducts.should.be.calledWith(query);
        getAllProducts.should.not.be.calledOnce;
      });
    });

    describe("when request does not have query params", () => {
      it("should return all products", async () => {
        const products = [{ name: "product foo" }, { name: "product bar" }];

        getAllProducts.resolves(products);

        const res = await request(app)
          .get("/")
          .expect(200);

        res.body.should.be.deep.equal(products);
        getAllProducts.should.be.calledOnce;
        getProducts.should.not.be.calledOnce;
      });
    });

    describe("when error occurs", () => {
      it("should call next middleware with the error", async () => {
        const error = new Error("failed");
        getAllProducts.rejects(error);

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
