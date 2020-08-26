// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Todo {
    struct Task {
        uint256 id;
        string task;
    }

    mapping(uint256 => Task) public tasks;

    uint256 public id;

    constructor() public {
        id = 0;
    }

    function addTask(string memory _task) public {
        id++;
        tasks[id] = Task(id, _task);
    }
}
