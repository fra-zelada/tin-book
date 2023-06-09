"use client";
import { FC, useState } from "react";
import { BooksBase } from "../interfaces/booksBase";

interface Props {
    book: BooksBase;
}

export const BookmarkItem: FC<Props> = ({ book }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <li
            className={`cursor-pointer my-1   bg-surfaceColor text-textOnSurfaceColor rounded-md pt-2 pb-3 px-1 md:p-2  `}
        >
            <div
                className="relative  text-xl tracking-tight  flex flex-row justify-between  h-full items-stretch "
                onClick={toggleVisibility}
            >
                <div className="">
                    <picture>
                        <img
                            src={book.img}
                            alt={book.title}
                            className="rounded-sm border-2 shadow-md shadow-shadowColor min-w-[135px]"
                        />
                    </picture>
                </div>
                <div className=" flex flex-col pl-1 ">
                    {/* Category  */}
                    <div className="h-1/5 md:h-2/5 flex flex-col  justify-start text-end ">
                        <div className="m-0">
                            <span className="text-xs md:text-md font-semibold   bg-secondary text-textOnSecondaryColor px-4 py-1 rounded-xl border border-borderColor shadow shadow-shadowColor whitespace-nowrap">
                                {book.genre}
                            </span>
                        </div>
                    </div>
                    {/* Title and expand button */}
                    <div className="flex flex-row justify-end items-center mr-0 space-x-1 h-3/5 md:h-1/5 py-1">
                        <p className="text-end mr-0 md:mr-12">{book.title}</p>
                    </div>
                    {/* Author */}
                    <div className="h-1/5 md:h-2/5 ">
                        <p className="text-sm text-end mr-0 md:mr-12 py-1 ">
                            {`${book.author[0]} ✍️`}
                        </p>
                    </div>
                </div>
                <div className="absolute left-[50%] right-[50%] -bottom-3 flex flex-col items-center justify-center ">
                    <div className="relative flex items-center justify-center flex-col space-y-0">
                        <div className="text-xs absolute -top-1 font-light whitespace-nowrap hidden md:block">
                            {visible ? "Ocultar" : "Mostrar más"}
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`fill-secondary ${
                                visible ? "  rotate-180  " : " rotate-0"
                            } transition-transform `}
                            height="40"
                            viewBox="0 -960 960 960"
                            width="40"
                        >
                            <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                className={`divide-y-2 no-scrollbar toggleDiv  ${
                    visible ? "visibleDiv" : ""
                }`}
            >
                <div className="inline-block"></div>
                <div className=" text-md md:text-base px-2 md:px-8 py-3 leading-4 md:leading-6 indent-9 inline-block text-justify">
                    {book.description}
                </div>
            </div>
        </li>
    );
};
