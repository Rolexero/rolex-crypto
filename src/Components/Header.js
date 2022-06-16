import React, {useState} from "react";
import { Navbar, Button, Dropdown } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {useGlobalContext} from '../Context/CryptoContext'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Header = () => {
const {currencyInfo, currentData, setCurrency, data} = useGlobalContext();
  return (
    <div className="w-full shadow-lg bg-brightDark text-white">
      <Navbar
        fluid={true}
        rounded={true}
        className="container mx-auto bg-brightDark text-base"
      >
        <Link to="/">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ">
            Rolex-Crypto
          </span>
        </Link>
        <div className="flex md:order-2 ">
          <Listbox value={currentData} onChange={(e) => setCurrency(e)}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-brightDark border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-black  sm:text-sm">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {currentData.name}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {currencyInfo.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active ? "text-white bg-black" : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-black",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
