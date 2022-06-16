import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Paginationcomp = ({
  filterList,
  setCurrentPage,
  currentPage,
  start,
  end,
  statusValue,
}) => {
  const [pageNum, setPageNum] = useState();
  const [prevBoolean, setPrevBoolean] = useState();
  const [nextBoolean, setNextBoolean] = useState();
  useEffect(() => {
    setPageNum(
      Array.from(
        { length: (filterList.length / 10).toFixed(0) },
        (_, i) => i + 1
      )
    );
    setPrevBoolean(start - 1 >= 0);
    setNextBoolean(end < filterList.length);
  }, [filterList, currentPage, start, end]);

  const buttonVal = (val) => {
    window.scroll(0, 450);
    setCurrentPage(val - 1);
  };

  const nextHandler = () => {
    window.scroll(0, 450);
    setCurrentPage((prev) => prev + 1);
    setNextBoolean(end < filterList.length - 10);
    setPrevBoolean(start - 1 >= 0);
  };

  const prevHandler = () => {
    window.scroll(0, 450);
    setCurrentPage((prev) => prev - 1);
    setPrevBoolean(start - 1 >= 10);
    setNextBoolean(end <= filterList.length);
  };

  if (statusValue === "loading") {
    return null;
  }

  if (filterList.length === 0) {
    return (
      <div className="text-center text-2xl bg-brightDark text-white mt-5 h-screen">
        No coin to display
      </div>
    );
  }

  return (
    <div className="bg-brightDark px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 container mx-auto ">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={!prevBoolean}
          onClick={prevHandler}
          className="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-brightDark text-colorGold hover:bg-gray-700 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-brightDark disabled:border-0"
        >
          Previous
        </button>
        <div>
          <p className="text-sm text-colorGold">
            Showing <span className="font-medium">{start + 1}</span> to{" "}
            <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{filterList.length}</span> results
          </p>
        </div>

        <button
          onClick={nextHandler}
          className="ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-colorGold bg-brightDark hover:bg-gray-700 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-brightDark disabled:border-0"
          disabled={!nextBoolean}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-colorGold">
            Showing <span className="font-medium">{start + 1}</span> to{" "}
            <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{filterList.length}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-full shadow-sm"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {pageNum?.map((val) => {
              return (
                <button
                  onClick={() => buttonVal(val)}
                  key={val}
                  aria-current="page"
                  className={`z-10   relative inline-flex items-center px-4 py-2  text-sm font-medium  rounded-full hover:bg-gray-600 ${
                    currentPage + 1 === val
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "text-colorGold bg-brightDark"
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Paginationcomp;
