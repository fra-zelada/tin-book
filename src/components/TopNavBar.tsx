"use client";
import { useEffect, useState } from "react";
import { DarkModeIcon, LogoIcon } from "./Icons";
import NextLink from "next/link";

export const TopNavBar = () => {
    // const [toggleTheme, setToggleTheme] = useState<boolean>(false);
    const [theme, setTheme] = useState<"dark" | "default">();

    const toogleTheme = () => {
        const root = document.getElementsByTagName("html")[0];
        root.classList.toggle("dark");
        if (root.classList.contains("dark")) {
            setTheme("dark");
            document.cookie = `theme=${"dark"}`;
        } else {
            setTheme("default");
            document.cookie = `theme=${"default"}`;
        }
    };

    useEffect(() => {
        const root = document.getElementsByTagName("html")[0];

        if (root.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("default");
        }
    }, []);

    return (
        <div className=" min-w-full left-0 right-0 h-16 bg-gradient-to-tr from-primary from-25% to-primaryVariant  fixed top-0 z-10 border border-borderColor">
            <div className="max-w-screen-lg h-full flex flex-row items-center justify-center mx-auto">
                <div className="flex flex-row items-center justify-between h-full w-full  px-4 md:px-12">
                    <NextLink
                        className="font-bold text-textColor flex flex-row items-center "
                        href={"/"}
                    >
                        <LogoIcon className="mr-1 md:mr-3 stroke-textOnBackgroundColor" />{" "}
                        Tin-Book
                    </NextLink>
                    <div className="flex flex-row items-center justify-center">
                        <div
                            className={`${
                                theme === undefined && "hidden"
                            } relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in`}
                        >
                            <input
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                checked={theme == "dark"}
                                onChange={() => {
                                    toogleTheme();
                                }}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                                htmlFor="toggle"
                                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                        </div>
                        <label htmlFor="toggle" className=" ">
                            <DarkModeIcon className="stroke-textOnBackgroundColor h-5 w-5" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
