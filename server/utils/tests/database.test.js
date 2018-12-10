/* global beforeEach afterEach describe it:true */
/* eslint no-undef: "error" */

const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");

const logging = require("./../logging");
const database = require("./../database");

const connect = sinon.stub(mongoose, "connect");
const logError = sinon.stub(logging, "logError");

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

      assert(connect.calledOnce);
    });

    describe("when connection success", () => {
      it("should not log error", async () => {
        connect.resolves();

        await database.connect();

        assert(logError.notCalled);
      });
    });

    describe("when connection failed", () => {
      it("should log error", async () => {
        connect.rejects();

        await database.connect();

        assert(logError.calledOnce);
      });
    });
  });
});
