/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AuctionHouse, AuctionHouseInterface } from "../AuctionHouse";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_winner",
        type: "address",
      },
    ],
    name: "AuctionSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Bid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "advanceAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "auctionDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctions",
    outputs: [
      {
        internalType: "address payable",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IToken",
        name: "_nft",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_auctionDuration",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initiateAuctionHouse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nft",
    outputs: [
      {
        internalType: "contract IToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "setAuctionDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612375806100206000396000f3fe6080604052600436106100dd5760003560e01c80638da5cb5b1161007f578063a4d0a17e11610059578063a4d0a17e1461025a578063cd6dc68714610271578063e2d7af251461029a578063f2fde38b146102b1576100dd565b80638da5cb5b146101ef578063901c04241461021a578063a497e67414610231576100dd565b806347ccca02116100bb57806347ccca0214610142578063571a26a01461016d5780635c975abb146101ad578063715018a6146101d8576100dd565b80630cbf54c8146100e257806317d70f7c1461010d5780631998aeef14610138575b600080fd5b3480156100ee57600080fd5b506100f76102da565b6040516101049190611df2565b60405180910390f35b34801561011957600080fd5b506101226102e0565b60405161012f9190611df2565b60405180910390f35b6101406102e6565b005b34801561014e57600080fd5b506101576106aa565b6040516101649190611c97565b60405180910390f35b34801561017957600080fd5b50610194600480360381019061018f91906119a4565b6106d0565b6040516101a49493929190611bc9565b60405180910390f35b3480156101b957600080fd5b506101c2610720565b6040516101cf9190611c7c565b60405180910390f35b3480156101e457600080fd5b506101ed610737565b005b3480156101fb57600080fd5b506102046107bf565b6040516102119190611bae565b60405180910390f35b34801561022657600080fd5b5061022f6107e9565b005b34801561023d57600080fd5b50610258600480360381019061025391906119a4565b610899565b005b34801561026657600080fd5b5061026f61091f565b005b34801561027d57600080fd5b5061029860048036038101906102939190611968565b6109c6565b005b3480156102a657600080fd5b506102af610b09565b005b3480156102bd57600080fd5b506102d860048036038101906102d3919061193f565b610b97565b005b60cb5481565b60ca5481565b6002609754141561032c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032390611dd2565b60405180910390fd5b600260978190555060cc600060ca54815260200190815260200160002060010154341161038e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038590611d12565b60405180910390fd5b600060c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016103eb9190611bae565b60206040518083038186803b15801561040357600080fd5b505afa158015610417573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043b91906119cd565b1461047b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047290611db2565b60405180910390fd5b600060cc600060ca5481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250509050600081600001519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461059c578073ffffffffffffffffffffffffffffffffffffffff166108fc83602001519081150290604051600060405180830381858888f1935050505015801561059a573d6000803e3d6000fd5b505b3360cc600060ca54815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503460cc600060ca5481526020019081526020016000206001018190555060006123284284606001516106259190611eb5565b10905080156106605761012c60cc600060ca54815260200190815260200160002060030160008282546106589190611e5f565b925050819055505b7f19421268847f42dd61705778018ddfc43bcdce8517e7a630acb12f122c709481333460ca5460405161069593929190611c45565b60405180910390a15050506001609781905550565b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60cc6020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b6000606560009054906101000a900460ff16905090565b61073f610c8f565b73ffffffffffffffffffffffffffffffffffffffff1661075d6107bf565b73ffffffffffffffffffffffffffffffffffffffff16146107b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107aa90611d92565b60405180910390fd5b6107bd6000610c97565b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6107f1610720565b15610831576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082890611d32565b60405180910390fd5b60026097541415610877576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086e90611dd2565b60405180910390fd5b6002609781905550610887610d5d565b61088f610fa2565b6001609781905550565b6108a1610c8f565b73ffffffffffffffffffffffffffffffffffffffff166108bf6107bf565b73ffffffffffffffffffffffffffffffffffffffff1614610915576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090c90611d92565b60405180910390fd5b8060cb8190555050565b60026097541415610965576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095c90611dd2565b60405180910390fd5b6002609781905550610975610720565b6109b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ab90611cd2565b60405180910390fd5b6109bc610d5d565b6001609781905550565b600060019054906101000a900460ff16806109ec575060008054906101000a900460ff16155b610a2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2290611d72565b60405180910390fd5b60008060019054906101000a900460ff161590508015610a7b576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610a8361115c565b610a8b61123d565b610a93611326565b610a9b61140f565b8260c960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160cb819055508015610b045760008060016101000a81548160ff0219169083151502179055505b505050565b610b11610c8f565b73ffffffffffffffffffffffffffffffffffffffff16610b2f6107bf565b73ffffffffffffffffffffffffffffffffffffffff1614610b85576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7c90611d92565b60405180910390fd5b610b8d6114b2565b610b95610fa2565b565b610b9f610c8f565b73ffffffffffffffffffffffffffffffffffffffff16610bbd6107bf565b73ffffffffffffffffffffffffffffffffffffffff1614610c13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0a90611d92565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610c83576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7a90611cf2565b60405180910390fd5b610c8c81610c97565b50565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060cc600060ca5481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820154815250509050600081604001511415610e3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3490611cb2565b60405180910390fd5b8060600151421015610e84576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7b90611d52565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff161415610ec257610f5a565b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd30836000015160ca546040518463ffffffff1660e01b8152600401610f2793929190611c0e565b600060405180830381600087803b158015610f4157600080fd5b505af1158015610f55573d6000803e3d6000fd5b505050505b7f76c2f4c23d0ee356d9a5e6ec3d22d056d7c988b2d4a6028d6189419044d9d8f060ca5482602001518360000151604051610f9793929190611e0d565b60405180910390a150565b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631249c58b6040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561100c57600080fd5b505af192505050801561103d57506040513d601f19601f8201168201806040525081019061103a91906119cd565b60015b6110885761104961203e565b806308c379a01415611077575061105e612264565b806110695750611079565b61107161140f565b50611083565b505b3d6000803e3d6000fd5b61115a565b8060ca8190555060006040518060800160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200142815260200160cb54426110d49190611e5f565b81525090508060cc600060ca54815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015590505050505b565b600060019054906101000a900460ff1680611182575060008054906101000a900460ff16155b6111c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111b890611d72565b60405180910390fd5b60008060019054906101000a900460ff161590508015611211576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b611219611554565b801561123a5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611263575060008054906101000a900460ff16155b6112a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129990611d72565b60405180910390fd5b60008060019054906101000a900460ff1615905080156112f2576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6112fa611635565b61130261170e565b80156113235760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff168061134c575060008054906101000a900460ff16155b61138b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161138290611d72565b60405180910390fd5b60008060019054906101000a900460ff1615905080156113db576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6113e3611635565b6113eb611802565b801561140c5760008060016101000a81548160ff0219169083151502179055505b50565b611417610720565b15611457576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161144e90611d32565b60405180910390fd5b6001606560006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861149b610c8f565b6040516114a89190611bae565b60405180910390a1565b6114ba610720565b6114f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f090611cd2565b60405180910390fd5b6000606560006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61153d610c8f565b60405161154a9190611bae565b60405180910390a1565b600060019054906101000a900460ff168061157a575060008054906101000a900460ff16155b6115b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115b090611d72565b60405180910390fd5b60008060019054906101000a900460ff161590508015611609576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b600160978190555080156116325760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff168061165b575060008054906101000a900460ff16155b61169a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169190611d72565b60405180910390fd5b60008060019054906101000a900460ff1615905080156116ea576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b801561170b5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611734575060008054906101000a900460ff16155b611773576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161176a90611d72565b60405180910390fd5b60008060019054906101000a900460ff1615905080156117c3576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6000606560006101000a81548160ff02191690831515021790555080156117ff5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611828575060008054906101000a900460ff16155b611867576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161185e90611d72565b60405180910390fd5b60008060019054906101000a900460ff1615905080156118b7576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6118c76118c2610c8f565b610c97565b80156118e85760008060016101000a81548160ff0219169083151502179055505b50565b6000813590506118fa816122fa565b92915050565b60008135905061190f81612311565b92915050565b60008135905061192481612328565b92915050565b60008151905061193981612328565b92915050565b60006020828403121561195157600080fd5b600061195f848285016118eb565b91505092915050565b6000806040838503121561197b57600080fd5b600061198985828601611900565b925050602061199a85828601611915565b9150509250929050565b6000602082840312156119b657600080fd5b60006119c484828501611915565b91505092915050565b6000602082840312156119df57600080fd5b60006119ed8482850161192a565b91505092915050565b6119ff81611f55565b82525050565b611a0e81611efb565b82525050565b611a1d81611ee9565b82525050565b611a2c81611f0d565b82525050565b611a3b81611f67565b82525050565b6000611a4e601683611e4e565b9150611a598261207e565b602082019050919050565b6000611a71601483611e4e565b9150611a7c826120a7565b602082019050919050565b6000611a94602683611e4e565b9150611a9f826120d0565b604082019050919050565b6000611ab7600b83611e4e565b9150611ac28261211f565b602082019050919050565b6000611ada601083611e4e565b9150611ae582612148565b602082019050919050565b6000611afd601183611e4e565b9150611b0882612171565b602082019050919050565b6000611b20602e83611e4e565b9150611b2b8261219a565b604082019050919050565b6000611b43602083611e4e565b9150611b4e826121e9565b602082019050919050565b6000611b66600e83611e4e565b9150611b7182612212565b602082019050919050565b6000611b89601f83611e4e565b9150611b948261223b565b602082019050919050565b611ba881611f4b565b82525050565b6000602082019050611bc36000830184611a14565b92915050565b6000608082019050611bde6000830187611a05565b611beb6020830186611b9f565b611bf86040830185611b9f565b611c056060830184611b9f565b95945050505050565b6000606082019050611c236000830186611a14565b611c3060208301856119f6565b611c3d6040830184611b9f565b949350505050565b6000606082019050611c5a6000830186611a14565b611c676020830185611b9f565b611c746040830184611b9f565b949350505050565b6000602082019050611c916000830184611a23565b92915050565b6000602082019050611cac6000830184611a32565b92915050565b60006020820190508181036000830152611ccb81611a41565b9050919050565b60006020820190508181036000830152611ceb81611a64565b9050919050565b60006020820190508181036000830152611d0b81611a87565b9050919050565b60006020820190508181036000830152611d2b81611aaa565b9050919050565b60006020820190508181036000830152611d4b81611acd565b9050919050565b60006020820190508181036000830152611d6b81611af0565b9050919050565b60006020820190508181036000830152611d8b81611b13565b9050919050565b60006020820190508181036000830152611dab81611b36565b9050919050565b60006020820190508181036000830152611dcb81611b59565b9050919050565b60006020820190508181036000830152611deb81611b7c565b9050919050565b6000602082019050611e076000830184611b9f565b92915050565b6000606082019050611e226000830186611b9f565b611e2f6020830185611b9f565b611e3c60408301846119f6565b949350505050565b6000604051905090565b600082825260208201905092915050565b6000611e6a82611f4b565b9150611e7583611f4b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611eaa57611ea9611fe0565b5b828201905092915050565b6000611ec082611f4b565b9150611ecb83611f4b565b925082821015611ede57611edd611fe0565b5b828203905092915050565b6000611ef482611f2b565b9050919050565b6000611f0682611f2b565b9050919050565b60008115159050919050565b6000611f2482611ee9565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000611f6082611f8b565b9050919050565b6000611f7282611f79565b9050919050565b6000611f8482611f2b565b9050919050565b6000611f9682611f9d565b9050919050565b6000611fa882611f2b565b9050919050565b611fb882612060565b810181811067ffffffffffffffff82111715611fd757611fd661200f565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d111561205d5760046000803e61205a600051612071565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f41554354494f4e204841534e2754205354415254454400000000000000000000600082015250565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f42494420544f4f204c4f57000000000000000000000000000000000000000000600082015250565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b7f41554354494f4e204e4f5420454e444544000000000000000000000000000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f43414e204f4e4c59204f574e2031000000000000000000000000000000000000600082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b600060443d1015612274576122f7565b61227c611e44565b60043d036004823e80513d602482011167ffffffffffffffff821117156122a45750506122f7565b808201805167ffffffffffffffff8111156122c257505050506122f7565b80602083010160043d0385018111156122df5750505050506122f7565b6122ee82602001850186611faf565b82955050505050505b90565b61230381611ee9565b811461230e57600080fd5b50565b61231a81611f19565b811461232557600080fd5b50565b61233181611f4b565b811461233c57600080fd5b5056fea2646970667358221220eb77d32a4ebb4554a3f82c945c064a7cd20f5b07b61d49a7ce028ee76a85694364736f6c63430008040033";

type AuctionHouseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AuctionHouseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AuctionHouse__factory extends ContractFactory {
  constructor(...args: AuctionHouseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AuctionHouse> {
    return super.deploy(overrides || {}) as Promise<AuctionHouse>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AuctionHouse {
    return super.attach(address) as AuctionHouse;
  }
  connect(signer: Signer): AuctionHouse__factory {
    return super.connect(signer) as AuctionHouse__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AuctionHouseInterface {
    return new utils.Interface(_abi) as AuctionHouseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AuctionHouse {
    return new Contract(address, _abi, signerOrProvider) as AuctionHouse;
  }
}