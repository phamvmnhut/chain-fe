import React, { useContext, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Button, Label, Checkbox } from "flowbite-react";

import logo from "assets/images/chain.png";
import { ChainContext } from "context/ChainContext";
import { truncate } from "utils/shortenAddress";

function NavBarItem({ title, classprops }) {
  return (
    <li className={`mx-4 cursor-pointer hover:text-blue-400 ${classprops}`}>{title}</li>
  );
}

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const { address, saveAddress } = useContext(ChainContext);

  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
  });

  function onCloseCb() {
    setIsShowLoginModal(false);
  }

  function onLoginClick(e) {
    e.preventDefault()

    if (formData?.address) {
      saveAddress(formData.address);
      setIsShowLoginModal(false);
    }
  }

  function logoutClick() {
    saveAddress(null);
  }

  return (
    <>
      <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
            <NavBarItem key={item + index} title={item} />
          ))}
          {
            address ? (<>
              <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                {truncate(address, 8)}
              </li>
              <li type="button" className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                onClick={logoutClick}
              >
                Log out
              </li>
              </>) : (
              <li type="button" className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                onClick={() => setIsShowLoginModal(true)}
              >
                Login
              </li>
            )
          }
        </ul>
        <div className="flex relative">
          {!toggleMenu && (
            <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
          )}
          {toggleMenu && (
            <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              {["Market", "Exchange", "Tutorials", "Wallets"].map(
                (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
              )}
            </ul>
          )}
        </div>
      </nav>

      <Modal
        show={isShowLoginModal}
        size="md"
        popup={true}
        onClose={onCloseCb}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <Label
                className="mb-2 block"
                htmlFor="name"
              >
                Your address
              </Label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your address"
                required
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            {/* <div>
              <Label
                className="mb-2 block"
                htmlFor="password"
              >
                Your password
              </Label>
              <input type="text" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your pharse" />
            </div> */}
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="dark:border-gray-500 dark:bg-gray-600"
                />
                <Label htmlFor="remember">
                  Remember me
                </Label>
              </div>
              {/* <a
                href="/modal"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a> */}
            </div>
            <div className="w-full">
              <Button
              type="submit"
                onClick={onLoginClick}
              >
                Log in
              </Button>
            </div>
            {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{' '}
              <a
                href="/modal"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
