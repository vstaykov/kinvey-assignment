/* eslint-disable no-unused-expressions */
/* global beforeEach afterEach describe it:true */
/* eslint no-undef: "error" */

const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const logging = require("./../logging");
const database = require("./../database");

const connect = sinon.stub(mongoose, "connect");
const logError = sinon.stub(logging, "logError");

chai.should();
chai.use(sinonChai);

beforeEach(() => {
  connect.callsFake(() => {});
  logError.callsFake(() => {});
});

afterEach(() => {
  connect.reset();
  logError.reset();
});

describe("database.js", () => {
  describe("#connect()", () => {
    it("should connect to mongoose", async () => {
      connect.resolves();

      await database.connect();

      connect.should.be.calledOnce;
    });

    describe("when connection success", () => {
      it("should not log error", async () => {
        connect.resolves();

        await database.connect();

        logError.should.not.be.called;
      });
    });

    describe("when connection failed", () => {
      it("should log error", async () => {
        connect.rejects();

        await database.connect();

        logError.should.be.calledOnce;
      });
    });
  });
});
