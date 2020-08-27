const { convertTypeAcquisitionFromJson } = require("typescript");
const { equal } = require("assert");

const Todo = artifacts.require("./Todo.sol");

contract("Todo", (accounts) => {
  it("Initialize todo", () => {
    return Todo.deployed()
      .then((instance) => {
        return instance.idCount();
      })
      .then((idCount) => {
        console.log(idCount);
        equal(idCount, 0, "Initial value of idCount is zero.");
      });
  });
});
