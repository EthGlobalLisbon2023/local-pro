pragma solidity ^0.8.0;

contract AddressList {
    address[] public addresses;

    function addAddress(address newAddress) public {
        addresses.push(newAddress);
    }

    function removeAddress(uint256 index) public {
        require(index < addresses.length, "Invalid index");
        addresses[index] = addresses[addresses.length - 1];
        addresses.pop();
    }

    function getAllAddresses() public view returns (address[] memory) {
        return addresses;
    }
}
