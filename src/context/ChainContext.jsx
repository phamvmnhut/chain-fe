/* eslint-disable react-hooks/exhaustive-deps */
import { chainApi } from "apis";
import React, { useEffect, useState } from "react";
import { get_local_storage_data, localStorageKey, set_local_storage_data, remove_local_storage_data } from "utils/localStorage";

export const ChainContext = React.createContext();

export function ChainProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  function saveAddress(address) {
    setAddress(address);
    if (address) {
      set_local_storage_data(localStorageKey, address);
    } else {
      remove_local_storage_data(localStorageKey);
    }
  }

  useEffect(() => {
    // get adddress from local storage
    const address = get_local_storage_data(localStorageKey);
    if (address) {
      saveAddress(address);
    }
  }, []);

  useEffect(() => {
    // get balance of address
    if (address) {
      // get balance of address
      getBalance();
    }
  }, [address]);

  async function getBalance() {
    if (address) {
      chainApi.getBalance(address).then((res) => {
        setBalance(res?.data?.result?.Balance);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <ChainContext.Provider
      value={{
        address,
        saveAddress,
        getBalance,
        balance,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};
