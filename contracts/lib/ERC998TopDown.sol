// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24 <0.8.1;


import "./ComposableTopDown.sol";
import "https://github.com/BitGuildPlatform/Contracts/blob/master/contracts/lib/ERC721Metadata.sol";
import "https://github.com/BitGuildPlatform/Contracts/blob/master/contracts/lib/ERC721Enumerable.sol";
import "https://github.com/BitGuildPlatform/Contracts/blob/master/contracts/lib/SupportsInterfaceWithLookup.sol";
//import "https://github.com/mattlockyer/composables-998/blob/master/contracts/SafeMath.sol";
//import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";\
//import "https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol";

import "https://github.com/3scava1i3r/Old-OpenZepplin/blob/main/openzeppelin-contracts-2.0.0/contracts/payment/escrow/Escrow.sol";

contract ERC998TopDownToken is SupportsInterfaceWithLookup, ERC721Enumerable, ERC721Metadata, ComposableTopDown {
    
  using SafeMath for uint256;
  //using strings for *;

  
  
    

  bytes4 private constant InterfaceId_ERC721Enumerable = 0x780e9d63;
  /**
   * 0x780e9d63 ===
   *   bytes4(keccak256('totalSupply()')) ^
   *   bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)')) ^
   *   bytes4(keccak256('tokenByIndex(uint256)'))
   */
  bytes4 private constant InterfaceId_ERC721Metadata = 0x5b5e139f;
              
  // Mapping from owner to list of owned token IDs
  mapping(address => uint256[]) internal ownedTokens;

  // Mapping from token ID to index of the owner tokens list
  mapping(uint256 => uint256) internal ownedTokensIndex;

  // Array with all token ids, used for enumeration
  uint256[] internal allTokens;

  // Mapping from token id to position in the allTokens array
  mapping(uint256 => uint256) internal allTokensIndex;

  // Mapping from tokenId to URI 
  mapping(uint256 => string) internal URIs;
  
  /**
   * @dev Constructor function
   */
  constructor() public {
    // register the supported interfaces to conform to ERC721 via ERC165
    _registerInterface(InterfaceId_ERC721Enumerable);
    _registerInterface(InterfaceId_ERC721Metadata);
    _registerInterface(bytes4(ERC998_MAGIC_VALUE));
  }

  modifier existsToken(uint256 _tokenId){
    address owner = tokenIdToTokenOwner[_tokenId];
    require(owner != address(0), "This tokenId is invalid"); 
    _;
  }
  

  /**
   * @dev Gets the token name
   * @return string representing the token name
   */
  function name() external view returns (string) {
    return "CryptoSlug";
  }

  /**
   * @dev Gets the token symbol
   * @return string representing the token symbol
   */
  function symbol() external view returns (string) {
    return "SLUG";
  }

  /**
   * @dev Returns an URI for a given token ID
   * Throws if the token ID does not exist. May return an empty string.
   * @param _tokenId uint256 ID of the token to query
   */
  function tokenURI(uint256 _tokenId) external view existsToken(_tokenId) returns (string) {
    return URIs[_tokenId];
  }
  
  
  /**
   * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   */
  function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
      URIs[tokenId] = _tokenURI;
  }

  /**
   * @dev Gets the token ID at a given index of the tokens list of the requested owner
   * @param _owner address owning the tokens list to be accessed
   * @param _index uint256 representing the index to be accessed of the requested tokens list
   * @return uint256 token ID at the given index of the tokens list owned by the requested address
   */
  function tokenOfOwnerByIndex(
    address _owner,
    uint256 _index
  )
    public
    view
    returns (uint256)
  {
    require(address(0) != _owner);
    require(_index < tokenOwnerToTokenCount[_owner]);
    return ownedTokens[_owner][_index];
  }

  /**
   * @dev Gets the total amount of tokens stored by the contract
   * @return uint256 representing the total amount of tokens
   */
  function totalSupply() public view returns (uint256) {
    return allTokens.length;
  }

  /**
   * @dev Gets the token ID at a given index of all the tokens in this contract
   * Reverts if the index is greater or equal to the total number of tokens
   * @param _index uint256 representing the index to be accessed of the tokens list
   * @return uint256 token ID at the given index of the tokens list
   */
  function tokenByIndex(uint256 _index) public view returns (uint256) {
    require(_index < totalSupply());
    return allTokens[_index];
  }

  /**
   * @dev Internal function to add a token ID to the list of a given address
   * @param _to address representing the new owner of the given token ID
   * @param _tokenId uint256 ID of the token to be added to the tokens list of the given address
   */

  function _addTokenTo(address _to, uint256 _tokenId) internal whenNotPaused {
    uint256 length = ownedTokens[_to].length;
    ownedTokens[_to].push(_tokenId);
    ownedTokensIndex[_tokenId] = length;
  }

  /**
   * @dev Internal function to remove a token ID from the list of a given address
   * @param _from address representing the previous owner of the given token ID
   * @param _tokenId uint256 ID of the token to be removed from the tokens list of the given address
   */
  function _removeTokenFrom(address _from, uint256 _tokenId) internal whenNotPaused {
    uint256 tokenIndex = ownedTokensIndex[_tokenId];
    uint256 lastTokenIndex = ownedTokens[_from].length.sub(1);
    uint256 lastToken = ownedTokens[_from][lastTokenIndex];

    ownedTokens[_from][tokenIndex] = lastToken;
    ownedTokens[_from][lastTokenIndex] = 0;
    // Note that this will handle single-element arrays. In that case, both tokenIndex and lastTokenIndex are going to
    // be zero. Then we can make sure that we will remove _tokenId from the ownedTokens list since we are first swapping
    // the lastToken to the first position, and then dropping the element placed in the last position of the list

    ownedTokens[_from].length--;
    ownedTokensIndex[_tokenId] = 0;
    ownedTokensIndex[lastToken] = tokenIndex;
  }

  /**
   * @dev Internal function to mint a new token
   * Reverts if the given token ID already exists
   * @param _to address the beneficiary that will own the minted token
   * 
   */
  function _mint(address _to,string _tokenURI) internal whenNotPaused {

  uint256 _tokenId = allTokens.length;
    super._mint(_to, _tokenId);
    _addTokenTo(_to,_tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    allTokensIndex[_tokenId] = allTokens.length;
    allTokens.push(_tokenId);
    
  }

  //override
  //add Enumerable info
  function _transferFrom(address _from, address _to, uint256 _tokenId) internal whenNotPaused {
    // not allown to transfer when  only one  avatar
    super._transferFrom(_from, _to, _tokenId);
    _addTokenTo(_to,_tokenId);
    _removeTokenFrom(_from, _tokenId);
  }
  
    function random() public view returns(uint256 randomnumber_){
          return uint256(keccak256(abi.encodePacked(block.difficulty, now, uint256(66))));
          //uint256 random = uint256(keccak256(abi.encodePacked(block.difficulty, now, uint256(66))));
          //return random % 100;
  }
  
  
  struct ImposterInfo{
        string name;
        uint256 tokenId;
        address owner;
        //uint256 exp; //experience
        uint256 dna;
        bool staked;
        //address escrow;
        uint256 rarityscore;
        
        
    }
    
    event NewImposter(string _name, uint256 _dna,uint256 _tokenId,uint256 _rarityscore);
    ImposterInfo[] public Imposters;
    
    mapping(uint256 => ImposterInfo) ImposterList;
  
  
  
  function createImposter(string _name,uint256 _dna,string _tokenURI, uint256 _rarityscore) public {
      
      
      
      uint256 _tokenId = allTokens.length;
      Imposters.push(ImposterInfo(_name,_tokenId,msg.sender,_dna,false,_rarityscore));
      
      _mint(msg.sender,_tokenURI);
      emit NewImposter(_name,_dna,_tokenId,_rarityscore);

  }
  
  
   
    
}
