/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAuctionHouse, IAuctionHouseInterface } from "../IAuctionHouse";

const _abi = [
  {
    inputs: [],
    name: "bid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export class IAuctionHouse__factory {
  static readonly abi = _abi;
  static createInterface(): IAuctionHouseInterface {
    return new utils.Interface(_abi) as IAuctionHouseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAuctionHouse {
    return new Contract(address, _abi, signerOrProvider) as IAuctionHouse;
  }
}