"use client";

import { BookmarksIcon, BooksIcon } from "./Icons";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export const Nav = () => {
    const path = usePathname();

    return (
        <nav className="border-t left-0 right-0 min-w-full border-borderColor fixed bottom-0 h-12 md:h-24  bg-bgColor flex items-center justify-center text-textOnPrimaryColor">
            <div className=" space-x-2 flex flex-row items-center justify-between mx-14 md:justify-evenly px-4 md:px-8 lg:px-72  w-full  ">
                <div className="relative h-20 w-20 md:h-36 md:w-36 xs:w-1/2 flex flex-col justify-end items-center ">
                    <NextLink
                        className={`absolute inset-0 -top-16 m-auto md:relative p-3 md:p-8 h-16 w-16 rounded-full border border-borderColor shadow shadow-shadowColor hover:-translate-y-1 hover:shadow-2xl hover:shadow-shadowColor hover:bg-primaryVariant group transition-all md:h-32 md:w-32 flex items-center justify-center  ${
                            path === "/"
                                ? " font-semibold  bg-primaryVariant scale-105  "
                                : " font-medium stroke-[0.5]  text-sm  bg-primary scale-95  "
                        }`}
                        href="/"
                    >
                        <div
                            className={`md:relative w-full h-full text-center flex md:block justify-center items-center `}
                        >
                            <BooksIcon
                                className={`md:relative stroke-textOnPrimaryColor md:-top-3   h-16 w-16 md:h-16 md:w-16 group-hover:stroke-white transition-all ${
                                    path === "/"
                                        ? "active-nav-icon  "
                                        : " stroke-1 text-base font-normal "
                                }`}
                            />
                            <span
                                className={` hidden md:relative bottom-4   group-hover:text-white text-center  transition-all md:inline-block `}
                            >
                                Home
                            </span>
                        </div>
                    </NextLink>
                    <span
                        className={` md:hidden text-textOnBackgroundColor mb-5 ${
                            path === "/" ? "font-bold z-10" : "font-light"
                        }`}
                    >
                        Home
                    </span>
                </div>
                <div className="relative h-20 w-20 md:h-36 md:w-36 xs:w-1/2 flex flex-col justify-end items-center ">
                    <NextLink
                        className={`absolute inset-0 -top-16 m-auto md:relative p-3 md:p-8 h-16 w-16 rounded-full border border-borderColor shadow shadow-shadowColor hover:-translate-y-1 hover:shadow-2xl hover:shadow-shadowColor hover:bg-primaryVariant group transition-all md:h-32 md:w-32 flex items-center justify-center ${
                            path === "/bookmarks"
                                ? "font-semibold  bg-primaryVariant scale-105  "
                                : " stroke-[0.5]  text-sm font-medium bg-primary scale-95  "
                        }`}
                        href="/bookmarks"
                    >
                        <div
                            className={`md:relative w-full h-full text-center flex md:block justify-center items-center `}
                        >
                            <BookmarksIcon
                                className={`md:relative stroke-textOnPrimaryColor md:-top-3   h-16 w-16 md:h-16 md:w-16 group-hover:stroke-white transition-all ${
                                    path === "/bookmarks"
                                        ? "active-nav-icon  "
                                        : " stroke-1 text-base font-normal "
                                }`}
                            />
                            <span
                                className={` hidden md:relative bottom-4 md:flex flex-col items-center justify-center   group-hover:text-white text-center  transition-all  `}
                            >
                                Bookmarks
                            </span>
                        </div>
                    </NextLink>
                    <span
                        className={` md:hidden text-textOnBackgroundColor mb-5 ${
                            path === "/bookmarks"
                                ? "font-bold z-10"
                                : "font-light"
                        }`}
                    >
                        Bookmarks
                    </span>
                </div>
            </div>
        </nav>
    );
};
