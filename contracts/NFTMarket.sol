// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTMarket is ERC721Enumerable, AccessControl {
    uint256 private _tokenCounter;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    mapping(uint256 => string) private _tokenURIs;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("NFTMarket", "NFTM") {
        _tokenCounter = 0;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, msg.sender), "Must have minter role to mint");
        _;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function createToken(string memory _tokenURI) public onlyMinter returns (uint256) {
        _tokenCounter++;
        uint256 newTokenId = _tokenCounter;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        emit TokenMinted(msg.sender, newTokenId, _tokenURI);
        return newTokenId;
    }

    function getTokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    function grantMinterRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, account);
    }

    function revokeMinterRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, account);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, AccessControl) returns (bool) {
        return ERC721Enumerable.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }
}
