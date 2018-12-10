/* global afterEach describe it:true */
/* eslint no-undef: "error" */

const assert = require("assert");
const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const InvalidDataError = require("./../../errors/InvalidDataError");
const Product = require("./../../product/product-model");
const dbValidation = require("./../db-validaton");

const { expect } = chai;

describe("db-validation.js", () => {
  describe("#validateObjectId()", () => {
    const isValid = sinon.stub(mongoose.Types.ObjectId, "isValid");

    afterEach(() => {
      isValid.reset();
    });

    describe("when ID is valid", () => {
      it("should not throw an error", () => {
        isValid.returns(true);

        expect(
          dbValidation.validateObjectId.bind(dbValidation, "id")
        ).to.not.throw();
      });
    });

    describe("when ID is not valid", () => {
      it("should throw InvalidDataError", () => {
        isValid.returns(false);

        expect(dbValidation.validateObjectId.bind(dbValidation, "id")).to.throw(
          InvalidDataError
        );
      });
    });
  });

  describe("#validateModel()", () => {
    it("should call model validation", async () => {
      const model = {
        validate: sinon.spy()
      };

      await dbValidation.validateModel(model);

      assert(model.validate.calledOnce);
    });

    describe("when model is valid", () => {
      it("should not throw error", async () => {
        const model = {
          validate: () => sinon.stub().resolves()
        };

        await dbValidation.validateModel(model);
      });
    });

    describe("when model is not valid", () => {
      it("should throw InvalidDataError error", async () => {
        const model = {
          validate: () => sinon.stub().rejects()
        };

        try {
          await dbValidation.validateModel(model);
        } catch (err) {
          assert(err instanceof InvalidDataError);
        }
      });

      it("should throw error with correct message", async () => {
        const originalError = {
          nameErr: {},
          ageErr: {}
        };
        const model = {
          validate: () => sinon.stub().rejects(originalError)
        };

        try {
          await dbValidation.validateModel(model);
        } catch (err) {
          expect(err.message).to.be.eq("nameErr;ageErr");
        }
      });
    });
  });

  describe("#validateOrderItemsExist()", () => {
    const productFind = sinon.stub(Product, "find");

    afterEach(() => {
      productFind.reset();
    });

    describe("when all items exist", async () => {
      it("should not throw error", async () => {
        productFind.resolves([{ _id: "1" }, { _id: "2" }]);

        await dbValidation.validateOrderItemsExist([
          { product: "1" },
          { product: "2" }
        ]);
      });
    });

    describe("when any item does not exist", () => {
      it("should throw InvalidDataError error", async () => {
        productFind.resolves([{ _id: "1" }]);

        try {
          await dbValidation.validateOrderItemsExist([
            { product: "1" },
            { product: "2" }
          ]);
        } catch (err) {
          assert(err instanceof InvalidDataError);
        }
      });

      it("should throw error with missing ids message", async () => {
        productFind.resolves([{ _id: "1" }]);

        try {
          await dbValidation.validateOrderItemsExist([
            { product: "1" },
            { product: "2" },
            { product: "3" }
          ]);
        } catch (err) {
          expect(err.message).to.contain("2, 3");
        }
      });
    });
  });
});
