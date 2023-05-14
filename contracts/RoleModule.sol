// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Enum.sol";
import "./IZkBobDirectDeposits.sol";
import "./IERC20.sol";

// Add the ABI coder version pragma
pragma abicoder v2;


interface GnosisSafe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.

    function execTransactionFromModule(address to, uint256 value, bytes calldata data, Enum.Operation operation)
        external
        returns (bool success);
}

interface IERC677 {
    function transferAndCall(address to, uint256 amount, bytes calldata data) external;
}

contract RoleModule {

    // This is en enum containing all the possible requirements on the system.
    // In production it will be a separate file to be imported,
    // For simplicity in the demo we keep it here in the same file.
    enum REQUIREMENTS {
        CRIMINAL_CHECK,
        OVER_18,
        MUSIC_DIPLOMA
    }
    mapping(REQUIREMENTS => string) req2str;
    

    // Requirements to be met to be able to apply to the role. 
    // This will be somehow mapped to polygon ID credentials.
    string[] public requirements;



    // Each role has a task counter which keeps track of how close to completion the role is
    uint256 public taskCounter;
    // Address of the worker to get paid.
    address payable public beneficiary;

     // Number of tasks included in the Role
    uint number_of_tasks;
    // Each task will pay out safe.balance() / # of tasks
    uint256 public releaseAmountperTask;
    // Address of the safe containing the funds
    address public safe;
    // Balance of safe
    uint public safe_balance;

    
    // Other characteristics of the job to be fetched by frontend.
    string id="123";
    string public logo="/logo-ams.png";
    string public title="Guitar Teacher";
    string public subtitle="City of Amsterdam";
    string public description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. ";
    string public compensation="25$ per Lesson";
    string public frequency="Weekly, 8 times";
    string public jobsUnlocked="AMS Certified Teacher";

    event TaskCompleted(uint256 taskCounter);
    event FundsReleased(address beneficiary, uint256 amount);

    constructor() {
        req2str[REQUIREMENTS.CRIMINAL_CHECK] = "CRIMINAL_CHECK";
        req2str[REQUIREMENTS.OVER_18]        = "OVER_18";
        req2str[REQUIREMENTS.MUSIC_DIPLOMA]  = "MUSIC_DIPLOMA";

        requirements = [
        req2str[REQUIREMENTS.CRIMINAL_CHECK],
        req2str[REQUIREMENTS.OVER_18],
        req2str[REQUIREMENTS.MUSIC_DIPLOMA]
        ];

        number_of_tasks = 3;
        taskCounter = 0;
        beneficiary = payable(address(0x6b98839E33d065B83417e306BCD3110E988E4c2C));

        // Safe info
        safe = address(0x716e7d350ED0Ce69BC62eCef9b3b4e9BacC2d39e);
        safe_balance = address(safe).balance;
        // Compute how much money is paid per task
        // releaseAmountperTask = safe_balance / number_of_tasks;
        releaseAmountperTask = 0.001e18;
 
    }

    function completeTask() public {
        taskCounter++;
        payPerTask();
        // if (taskCounter == 5) {
        //     emit TaskCompleted(taskCounter);
        // }
    }

    function getAllRequirements() public view returns (string[] memory) {
        return requirements;
    }

    function getSafeBalance() public view returns (uint256) {
    return address(safe).balance;
}

    function payPerTask() public {
        require(address(safe).balance >= releaseAmountperTask, "Insufficient funds in the Safe");
        require(GnosisSafe(address(safe)).execTransactionFromModule(beneficiary, releaseAmountperTask, "", Enum.Operation.Call), "Could not execute fund release");
        emit FundsReleased(beneficiary, releaseAmountperTask);
    }


    // zkBOB on Goerli
    IERC677 public bob = IERC677(0x97a4ab97028466FE67F18A6cd67559BAABE391b8);
    IERC20 bobi = IERC20(0x97a4ab97028466FE67F18A6cd67559BAABE391b8);
    IZkBobDirectDeposits queue = IZkBobDirectDeposits(0xE4C77B7787cC116A5E1549c5BB36DE07732100Bb);

    //Some basic events to help us track the deposit and withdrawal of BOB tokens
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);
    event Received(address, uint256);

    function directDeposit(uint256 amount, string memory zkRecieverAddress, address fallbackReceiver) public {
        bytes memory zkAddress = bytes(zkRecieverAddress);
        bob.transferAndCall(address(queue), amount, abi.encode(fallbackReceiver, zkAddress));
    }

}
