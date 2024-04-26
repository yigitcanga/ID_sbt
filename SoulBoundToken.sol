// SPDX-License-Identifier: MIT
// openzeppelin ERC721 library is used in this contract but not imported for cleaner ui look
pragma solidity ^0.8.7;

contract SoulBoundToken {
    

    uint256 private _tokenIdCounter;

    struct IDInfo {
        string name;
        uint256 id;
    }

    uint256 private currentTokenId;
    
    mapping(uint256 tokenId => address) private _owners;
    mapping(address owner => uint256) private _balances;
    mapping(uint256 id => address) private _idOwners;
    mapping(address => bool) public minters;

    modifier onlyMinter() {
        require(minters[msg.sender], "Caller is not a minter");
        _;
    }

    constructor( string memory name_, string memory symbol_) {}

        // Function to grant minting permission to an address
    function grantMinter(address _minter) public  {
        minters[_minter] = true;
    }

    // Function to revoke minting permission from an address
    function revokeMinter(address _minter) public  {
        minters[_minter] = false;
    }

    // Mint function callable only by addresses with minting permission
    function mint(address _to, string memory _name, uint256 _id) public onlyMinter {

        require(_idOwnerOf(_id) == address(0), "Token ID already exists");
        
        uint256 newTokenId = currentTokenId;
        currentTokenId++;

        if (_to == address(0)) {
            revert("Wrong minter adress");
        }
        address previousOwner = _update(_to, newTokenId, _id);
        if (previousOwner != address(0)) {
            revert("Wrong previous owner");
        }

        _setIDInfo(newTokenId, _name, _id);
    }

    // Internal function to set token information
    function _setIDInfo(uint256 _tokenId, string memory _name, uint256 _id) internal {
        IDInfo memory info = IDInfo(_name, _id);
        tokenInfo[_tokenId] = info;
    }

    // Mapping to store additional token information
    mapping(uint256 => IDInfo) private tokenInfo;

    function getTokenInfo(address owner) public view returns (IDInfo memory) {
        uint256 tokenId = getTokenIdFromAddress(owner);
        return tokenInfo[tokenId];
    }

    function verifyMessage(address _owner, bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (bool) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer == _owner;
    }

    function getTokenInfoAfterSigning(address _owner, bytes32 _messageHash, uint8 _v, bytes32 _r, bytes32 _s) public view returns (IDInfo memory) {
        require(verifyMessage(_owner, _messageHash, _v, _r, _s), "Signature verification failed");
        return getTokenInfo(_owner);
    }

    function getTokenIdFromAddress(address owner) public view returns (uint256) {
        for (uint256 i = 0; i < currentTokenId; i++) {
            if (_ownerOf(i) == owner) {
                return i;
            }
        
        }
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        revert("Your ID cannot be transfered");
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only the owner of the ID can burn it.");

        address previousOwner = _update(address(0), tokenId, tokenInfo[tokenId].id);
        if (previousOwner == address(0)) {
            revert ("ERC721NonexistentToken");
        }
        delete tokenInfo[tokenId];

    }

    function _idOwnerOf(uint256 id) public view returns (address) {
        return _idOwners[id];
    }

    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }

    function ownerOf(uint256 tokenId) public view virtual returns (address) {
        return _requireOwned(tokenId);
    }

    function _requireOwned(uint256 tokenId) internal view returns (address) {
        address owner = _ownerOf(tokenId);
        if (owner == address(0)) {
            revert ("NonexistentToken");
        }
        return owner;
    }

    function _update(address to, uint256 tokenId, uint256 id/*, address auth*/) internal returns (address) {
        address from = _ownerOf(tokenId);

        // Execute the update
        if (from != address(0)) {

            unchecked {
                _balances[from] -= 1;
            }
        }

        if (to != address(0)) {
            unchecked {
                _balances[to] += 1;
            }
        }

        _owners[tokenId] = to;
        _idOwners[id]    = to;   

        return from;
    }


}
