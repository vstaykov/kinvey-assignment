/* eslint-disable no-unused-expressions */
/* global beforeEach afterEach describe it:true */
/* eslint no-undef: "error" */

const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const route = require("./../order-route");
const controller = require("./../order-controller");

let app;

chai.should();
chai.use(sinonChai);

beforeEach(() => {
  app = express();
  app.use("/", route);
});

describe("order-route.js", () => {
  describe("#GET /:id/status", () => {
    const getOrderStatus = sinon.stub(controller, "getOrderStatus");

    afterEach(() => {
      getOrderStatus.reset();
    });

    describe("when order is found", () => {
      it("should return status code 200", async () => {
        getOrderStatus.resolves("delivered");

        const res = await request(app)
          .get("/id/status")
          .expect(200);

        res.status.should.be.equal(200);
      });

      it("should return order status", async () => {
        const status = "delivered";

        getOrderStatus.resolves(status);

        const res = await request(app)
          .get("/id/status")
          .expect(200);

        res.body.should.be.equal(status);
      });
    });

    describe("when order is not found", () => {
      it("should return status code 404", async () => {
        getOrderStatus.resolves();

        const res = await request(app)
          .get("/id/status")
          .expect(404);

        res.status.should.be.equal(404);
      });

      it("should return message", async () => {
        getOrderStatus.resolves();

        const res = await request(app)
          .get("/id/status")
          .expect(404);

        res.body.should.be.a("string").and.not.empty;
      });
    });

    describe("when error occurs", () => {
      it("should call next middleware with the error", async () => {
        const error = new Error("failed");
        getOrderStatus.rejects(error);

        /* eslint-disable-next-line no-unused-vars */
        app.use((err, req, res, next) => {
          err.should.be.deep.equal(error);
          res.send();
        });

        await request(app).get("/id/status");
      });
    });
  });

  describe("#POST /", () => {
    const createOrder = sinon.stub(controller, "createOrder");

    afterEach(() => {
      createOrder.reset();
    });

    it("should create order with request body", async () => {
      const body = { foo: "bar" };

      createOrder.resolves("order");

      await request(app)
        .post("/")
        .send(body)
        .expect(201);

      createOrder.should.be.calledOnce;
      // createOrder.should.be.calledWith(body);
    });

    describe("when order created successfully", () => {
      it("should return status code 201", async () => {
        createOrder.resolves("order");

        const res = await request(app)
          .post("/")
          .send("data")
          .expect(201);

        res.status.should.be.equal(201);
      });

      it("should return created order", async () => {
        const order = { foo: "bar" };

        createOrder.resolves(order);

        const res = await request(app)
          .post("/")
          .send("data")
          .expect(201);

        res.body.should.be.deep.equal(order);
      });
    });

    describe("when error occurs", () => {
      it("should call next middleware with the error", async () => {
        const error = new Error("failed");
        createOrder.rejects(error);

        /* eslint-disable-next-line no-unused-vars */
        app.use((err, req, res, next) => {
          err.should.be.deep.equal(error);
          res.send();
        });

        await request(app).post("/");
      });
    });
  });
});
