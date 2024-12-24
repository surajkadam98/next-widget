"use client"
import React from 'react';
import { ViewFiIcon } from "@/@assets/icons";
import { ChevronLeftIcon } from "@/@assets/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/@assets/icons/ChevronRightIcon";
import { MoonIcon } from "@/@assets/icons/MoonIcon";
import { StarIcon } from "@/@assets/icons/StarIcon";
import { SunIcon } from "@/@assets/icons/SunIcon";
import { reportClaims } from "@/@services/api";
import { useEffect, useRef, useState } from "react";
import Loader from './common/Loader';
import { getCSSVarByName } from '@/@utils';
import Link from 'next/link';

type Claim = {
  referer: string;
  count: number;
};

interface ILeaderBoard {
  campaignKey: string;
}

export const LeaderBoard: React.FC<ILeaderBoard> = ({
  campaignKey
}) => {
    // Access query parameters from router.query
  const [isFetching, setIsFetching] = React.useState(true);
  const [dark, setDark] = React.useState(false);
  const [logo, setLogo] = React.useState("");
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const currentPageRef = useRef<number>(0);

  const itemsPerPage = 6;

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const fetchCampaign = async () => {
    try {
      const currentPage = currentPageRef.current;
      if (campaignKey) {
        const res = await reportClaims(
          campaignKey,
          currentPage,
          itemsPerPage
        );
        const data = res.data;
        setLogo(data.logoUrl);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setClaims(data.claims);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    if (isFetching)
      fetchCampaign().then(() => {
        setIsFetching(false);
      });

    const intervalId = setInterval(() => {
      fetchCampaign();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignKey]);

  useEffect(() => {
    fetchCampaign();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return (
    <>
      <div
        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 duration-300 ease-in-out transition-all flex items-center justify-center w-full h-full bg-white ${
          isFetching ? "" : "hidden"
        }`}
      >
        <Loader color={widgetCurrentColor} className="h-28 w-28" />
      </div>
      <div className="max-w-[700px] flex flex-col items-center p-4 gap-8 mx-auto dark:bg-[#161616] text-black dark:text-white">
        <label className="relative flex items-center ms-auto me-5 -mb-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={darkModeHandler}
          />
          <div className="w-11 h-6 bg-[#001738] peer-focus:outline-none rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-primary peer-checked:bg-primary "></div>
          <MoonIcon className="absolute right-2" />
          <SunIcon className="right-7 absolute -mt-[2px]" />
        </label>
        <div className="flex sm:gap-10 gap-4 items-center">
          <img src={logo} alt="logo" className="w-[68px] h-[68px] rounded-xl" />
          <p className="sm:text-3xl md:text-4xl text-2xl text-center">
            Video Referral Leaderboard
          </p>
        </div>
        <div className="w-full">
          <table className="table-auto rounded-lg w-full font-medium">
            <thead className="bg-[#F6F6F6] dark:bg-[#2B2B2B] text-xs">
              <tr className="">
                <th className="py-5 px-7">Rank</th>
                <th className="py-5 px-7">Email</th>
                <th className="py-5 px-7">Referrals</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {claims.map((item, index) => (
                <tr
                  className="border border-[#E7E7E7] dark:border-[#414141]"
                  key={index}
                >
                  <td className="text-sm py-3 flex items-center gap-1 justify-center font-medium">
                    #{index + 1 + currentPage * 6}{" "}
                    {index + 1 + currentPage * 6 === 1 ||
                    index + 1 + currentPage * 6 === 2 ||
                    index + 1 + currentPage * 6 === 3 ? (
                      <StarIcon />
                    ) : (
                      <div className="w-[10px] h-[10px]"></div>
                    )}
                  </td>
                  <td className="text-sm py-3 font-medium">
                    {(() => {
                      const [username, domain] = item.referer.split("@");
                      const maskedUsername =
                        username.substring(0, 3) +
                        "*****" +
                        username.substring(username.length - 1);
                      return maskedUsername + "@" + domain;
                    })()}
                  </td>
                  <td className="text-xs py-3 font-medium">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex items-center justify-between py-3 cursor-pointer">
              <div className="flex flex-1 sm:hidden">
                {currentPage !== 0 && (
                  <span
                    onClick={handlePrevious}
                    className="relative me-auto inline-flex items-center rounded-md border border-[#E7E7E7] dark:border-[#414141] bg-[#F6F6F6] dark:bg-[#2B2B2B] px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-50"
                  >
                    Previous
                  </span>
                )}
                {currentPage !== totalPages - 1 && (
                  <span
                    onClick={handleNext}
                    className="relative ms-auto inline-flex items-center rounded-md border border-[#E7E7E7] dark:border-[#414141] bg-[#F6F6F6] dark:bg-[#2B2B2B] px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-50"
                  >
                    Next
                  </span>
                )}
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <span
                      onClick={handlePrevious}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => {
                        // Always show the current page and two pages on either side of it
                        if (
                          pageNumber - 1 >= currentPage - 2 &&
                          pageNumber - 1 <= currentPage + 2
                        ) {
                          return (
                            <span
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber - 1)}
                              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                pageNumber === currentPage + 1
                                  ? "bg-primary text-white dark:text-black"
                                  : "text-gray-500 dark:text-white"
                              } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                            >
                              {pageNumber}
                            </span>
                          );
                        }
                        // Don't render anything for the other page numbers
                        else {
                          return null;
                        }
                      }
                    )}
                    <span
                      onClick={handleNext}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-center">
            <p className="text-base">
              Want to join the video campaign leaderboard?
            </p>
            <p className="font-medium">
              Click{" "}
              <Link
                className="underline"
                href={`/c/${campaignKey}`}
                target="_blank"
              >
                here to watch
              </Link>{" "}
              and enter and generate your referral link{" "}
            </p>
          </div>
          <div className="flex justify-center text-[15.2px] gap-1 items-center">
            Powered by
            <div className="flex gap-1 items-center">
              <ViewFiIcon width={26} />
              <Link
                className="underline text-[#00277A]"
                href={"https://www.viewfi.io/"}
                target="_blank"
              >
                ViewFi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
