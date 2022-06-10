import React, { useContext, useState } from "react";

import { RiCopperCoinLine } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";

import { ChainContext } from "context/ChainContext";
import { shortenAddress } from "utils/shortenAddress";
import { chainApi } from "apis";

export default function Welcome() {
  const { address, balance } = useContext(ChainContext);

  const [newWalletAddress, setNewWalletAddress] = useState("...");

  async function newWalletClick() {
    chainApi.newWallet().then((res) => {
      setNewWalletAddress(res?.data?.result);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-center text-white  w-full justify-center items-center text-gradient py-1">
            BLOCKCHAIN
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base"></p>
          <div className=" flex items-center">
          <button
              type="button"
              onClick={newWalletClick}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold ">
                New Wallet 
              </p>
            </button>
            <p className=" ml-5 bg-teal-500 rounded-md px-5 py-2 ">
              {newWalletAddress}
            </p>
          </div>
            
          <h3 className="text-white text-3xl text-center my-2 flex w-full justify-center items-center 2xl:px-20 ">
            <br /> <br />
            Wallet Assets Information
          </h3>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-50 sm:w-85 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div>
                <p className="text-white font-semibold text-lg mt-1">
                  <RiCopperCoinLine fontSize={21} color="#fff" />
                  {balance} Chain Coins
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Wallet Address <br /> {shortenAddress(address)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
