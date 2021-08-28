// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24 <0.8.1;

import "../lib/ERC998TopDown.sol";

contract SlugFactory is ERC998TopDownToken {
    
    
    uint256 constant TRAITS_NUM = 8;
    
    mapping(address => uint256[]) ownerTokens;
    mapping(uint256 => SlugInfo) allSlugs; //mapping for getting a list of all slugs indexing or with tokenId
    
    struct SlugInfo{
        string name;
        uint256 tokenId;
        address owner;
        //uint256 exp; //experience
        uint256 randomNumber;
        bool staked;
        address escrow;
        int16[TRAITS_NUM] traits;
        
    }
    
    SlugInfo[] public Slugs;
    
    
    
    function totalSupply() public view returns (uint256 total_){
        total_ = Slugs.length;
    }
    
    function _balanceOf(address _owner) public view returns(uint256 balance_){
        require(_owner != address(0), "SlugFactory: _owner can't be address(0)");
        balance_ = ownerTokens[_owner].length;
    }
    
    function getSlug(uint256 _tokenId) private view returns(SlugInfo memory Slug_){
        Slug_ = _getSlug(_tokenId);
    } 
    
    function _getSlug(uint256 _tokenId) internal view returns(SlugInfo memory Slug_){
        Slug_  = allSlugs[_tokenId];
    }
}