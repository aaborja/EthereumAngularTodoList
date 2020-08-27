const { convertTypeAcquisitionFromJson } = require("typescript");
const { equal } = require("assert");
const { assert } = require("console");

const Todo = artifacts.require("./Todo.sol");

contract("Todo", (accounts) => {
  let todoInstance;

  it("Initialize todo", () => {
    return Todo.deployed()
      .then((instance) => {
        return instance.idCount();
      })
      .then((idCount) => {
        equal(idCount, 0, "Initial value of idCount is zero.");
      });
  });

  it("Adding task", () => {
    return Todo.deployed()
      .then((instance) => {
        todoInstance = instance;
        return todoInstance.addTask("Task 1");
      })
      .then(() => {
        return todoInstance.idCount();
      })
      .then((idCount) => {
        const id = 1;
        equal(idCount, id, "Current idCount is one");
        return todoInstance.tasks(id);
      })
      .then((task) => {
        const id = 1;
        const taskName = "Task Name";
        const done = false;
        equal(task[0], 1, `Task id is ${id}`);
        equal(task[1], "Task 1", `Task name is ${taskName}`);
        equal(task[3], done, `Task done is ${done}`);
      });
  });

  it("Task mark done", () => {
    const done = true;
    return Todo.deployed()
      .then((instance) => {
        todoInstance = instance;
        const id = 1;
        return todoInstance.markDone(id, done);
      })
      .then(() => {
        return todoInstance.tasks(1);
      })
      .then((task) => {
        equal(task[3], done, `Task done is ${done}`);
      });
  });

  it("Task mark undone", () => {
    const done = false;
    return Todo.deployed()
      .then((instance) => {
        todoInstance = instance;
        const id = 1;
        return todoInstance.markDone(id, done);
      })
      .then(() => {
        return todoInstance.tasks(1);
      })
      .then((task) => {
        equal(task[3], done, `Task done is ${done}`);
      });
  });

  it("Invalid task id", () => {
    return Todo.deployed()
      .then((instance) => {
        todoInstance = instance;
        const id = 99;
        return todoInstance.markDone(id, done);
      })
      .then(assert.fail)
      .catch((error) => {
        assert(
          error.message.indexOf("revert") >= 0,
          "Error message must contain revert"
        );
      });
  });
});
