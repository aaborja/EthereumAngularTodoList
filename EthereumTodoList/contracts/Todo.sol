// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Todo {
    struct Task {
        uint256 id;
        string task;
        uint256 dateTimeCreated;
        bool done;
    }

    event TaskCreated(
        uint256 id,
        string task,
        uint256 dateTimeCreated,
        bool done
    );

    mapping(uint256 => Task) public tasks;

    uint256 public idCount;

    constructor() public {
        idCount = 0;
    }

    function addTask(string memory _task) public {
        idCount++;
        tasks[idCount] = Task(idCount, _task, block.timestamp, false);
        emit TaskCreated(idCount, _task, block.timestamp, false);
    }

    function markDone(uint256 _id, bool _done) public {
        require(_id > 0 && _id <= idCount);
        Task memory _task = tasks[_id];
        _task.done = _done;
        tasks[_id] = _task;
    }

    function deleteTask(uint256 _id) public {
        delete tasks[_id];
    }
}
