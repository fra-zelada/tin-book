"use client";

import { BooksBase } from "@/interfaces/booksBase";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { BookmarkItem } from "./BookmarkItem";
import { FilterIcon } from "./Icons";
import { BookmarksFilter } from "./BookmarksFilter";
import { toggleShowFilters } from "@/slice";
export const BookmarksList = () => {
    const { book, ui } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const [bookmarks, setBookmarks] = useState<BooksBase[]>([]);

    const refListBooks = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setBookmarks((prev) => {
            const tempBooks = [...book.favBooks];

            const filteredBooks = [
                ...tempBooks.filter((book) =>
                    ui.bookmarksSelectedFilters?.includes(book?.genre)
                ),
            ];

            if (
                JSON.stringify(prev.sort()) !==
                JSON.stringify(filteredBooks.sort())
            ) {
                refListBooks.current?.classList.remove(
                    "animate-pulseEaseInOnce"
                );
                setTimeout(() => {
                    refListBooks.current?.classList.add(
                        "animate-pulseEaseInOnce"
                    );
                }, 10);
            }
            return filteredBooks;
        });
    }, [book.favBooks, ui.bookmarksSelectedFilters]);

    return (
        <section>
            <div className="bg-bgColor rounded-xl my-3 md:p-5 w-full md:w-[60vw] xl:w-[40vw] max-w-5xl md:my-10 mb-28 md:mb-40  ">
                <div className=" flex flex-col  w-full">
                    {/* Filtre button & dropdown */}
                    <div className="flex flex-row justify-end top-0 right-0 bg-surfaceColor rounded-t-xl mt-14 md:mt-1 w-screen md:w-full h-12 relative">
                        <div className="container flex flex-col justify-end items-end mx-4 my-1 ">
                            <div
                                className=" bg-primary text-textOnPrimaryColor px-2 py-1 rounded-full flex justify-center items-center flex-row relative hover:cursor-pointer hover:bg-primaryVariant "
                                onClick={() => {
                                    dispatch(toggleShowFilters(true));
                                }}
                            >
                                <div className=" h-8 w-8 flex items-center justify-center rounded-full border-textOnPrimaryColor border-2 mr-2">
                                    <FilterIcon className="h-6 w-6 stroke-textOnPrimaryColor " />
                                </div>
                                <span className="text-sm font-semibold bottom-1">
                                    Filtro
                                </span>
                            </div>
                            {/* Dropdown */}
                            <div className="relative max-h-0 max-w-0 ">
                                <div
                                    className={`absolute right-1 z-30  ${
                                        ui.showFilters
                                            ? " scale-100"
                                            : " scale-0"
                                    }  transition-transform origin-top-right `}
                                >
                                    <BookmarksFilter variant={"BOOKMARKS"} />
                                </div>
                            </div>
                            {/* ended dropdown */}
                        </div>
                    </div>
                    {bookmarks.length !== 0 && (
                        <ul
                            ref={refListBooks}
                            className=" w-full   rounded-lg shadow-lg shadow-shadowColor px-1 md:p-2 space-y-3 relative animate-pulseEaseInOnce "
                        >
                            {bookmarks.map((book) => (
                                <BookmarkItem book={book} key={book.img} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};
