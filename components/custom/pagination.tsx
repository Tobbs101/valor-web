/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  Pagination as Wrapper,
  PaginationContent,
  PaginationEllipsis,
} from "../ui/pagination";

const perPageOptions = [6, 12, 18, 24, 36, 48];

interface PaginationProps {
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNo,
  setPageNo,
  data,
  perPage,
  setPerPage,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);
  //   console.log({ data });
  const length = data?.lastPage || null;

  //   console.log(length);

  //   console.log(perPage);

  const pages = Array.from({ length }, (_, index) => index + 1);
  const chunkPages: React.SetStateAction<number>[][] = [];

  //if size of pages is more than 10, then break pages it sub-arrays of 10 items
  if (pages.length > 3) {
    const pageSize = 3;
    for (let i = 0; i < pages.length; i += pageSize) {
      const chunk = pages.slice(i, i + pageSize);
      chunkPages.push(chunk);
    }
  } else {
    chunkPages.splice(0, chunkPages.length);
  }

  // console.log({ chunkPages });

  // console.log(chunkPages.length);

  //   console.log({ pages });
  const handlePerPage = (value: string) => {
    setPageNo(1);
    setPerPage(parseInt(value));
    setCurrentPageNo(0);
  };

  // console.log(pageNo);

  // console.log(currentPageNo);

  if (!data || data?.lastPage === 1) {
    return (
      <div className="mt-6 mb-2 w-full text-black flex items-center gap-4 justify-end">
        {perPage && (
          <Select onValueChange={handlePerPage}>
            <SelectTrigger className="w-fit py-3 bg-white text-xs font-medium">
              <SelectValue placeholder={`${perPage} Per Page`} />
            </SelectTrigger>
            <SelectContent>
              {perPageOptions.map((perPageOption) => (
                <SelectItem
                  key={perPageOption}
                  value={perPageOption.toString()}
                  className="text-xs"
                >
                  {perPageOption} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  }

  return (
    <Wrapper>
      <PaginationContent className="w-full">
        <div className="mt-6 mb-2 w-full flex items-center gap-4 justify-between md:flex-row flex-col">
          <div className="flex items-center justify-center gap-1">
            {/*BACK BUTTON */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (chunkPages.length > 0 && currentPageNo !== 0) {
                    setCurrentPageNo(currentPageNo - 1);
                    setPageNo(chunkPages[currentPageNo - 1][0]);
                  }
                }}
                className={
                  chunkPages.length > 0 && currentPageNo !== 0
                    ? "text-white"
                    : "text-gray-400"
                }
                href="#"
              />
            </PaginationItem>

            {/*PAGINATION BUTTONS */}
            {chunkPages.length < 1 &&
              pages?.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className={
                      page == data?.page ? "text-black dark:text-white" : ""
                    }
                    onClick={() => {
                      setPageNo(page);
                    }}
                    isActive={page == data?.page}
                    href="#"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {chunkPages.length > 0 &&
              chunkPages[currentPageNo]?.map((page: any) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className={
                      page == data?.page ? "text-black dark:text-white" : ""
                    }
                    onClick={() => {
                      setPageNo(page);
                    }}
                    isActive={page == data?.page}
                    href="#"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {chunkPages.length > 0 &&
              pageNo !== data?.lastPage &&
              chunkPages[currentPageNo] && (
                <div className="flex items-center justify-center gap-1">
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      className={
                        pageNo == data?.lastPage
                          ? "text-black dark:text-white"
                          : ""
                      }
                      onClick={() => {
                        setCurrentPageNo(chunkPages.length - 1);
                        setPageNo(data?.lastPage);
                      }}
                      isActive={pageNo == data?.lastPage}
                      href="#"
                    >
                      {data?.lastPage}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              )}
            {/*FORWARD BUTTON */}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (
                    chunkPages.length > 0 &&
                    currentPageNo !== chunkPages.length - 1
                  ) {
                    setCurrentPageNo(currentPageNo + 1);
                    setPageNo(chunkPages[currentPageNo + 1][0]);
                  }
                }}
                className={
                  chunkPages.length > 0 &&
                  currentPageNo !== chunkPages.length - 1
                    ? "text-white"
                    : "text-gray-400"
                }
                href="#"
              />
            </PaginationItem>
          </div>
          {perPage && (
            <Select onValueChange={handlePerPage}>
              <SelectTrigger className="w-fit bg-white py-3 text-black text-xs font-medium">
                <SelectValue placeholder={`${perPage} Per Page`} />
              </SelectTrigger>
              <SelectContent>
                {perPageOptions.map((perPageOption) => (
                  <SelectItem
                    key={perPageOption}
                    value={perPageOption.toString()}
                    className="text-xs"
                  >
                    {perPageOption} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </PaginationContent>
    </Wrapper>
  );
};

export default Pagination;
