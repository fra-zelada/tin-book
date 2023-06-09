"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { BooksBase } from "../interfaces/booksBase";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addFavBook } from "@/slice/booksSlice";
import { FilterIcon } from "./Icons";
import { BookmarksFilter } from "./BookmarksFilter";
import { toggleShowFilters } from "@/slice";
import { Slide } from "./Slide";

import DATA from "../data/booksComplete.json";
import "@splidejs/react-splide/css";

export const Slider: FC = () => {
    const favs = useAppSelector((state) => state.book.favBooks);
    const { showFilters, homeSelectedFilters } = useAppSelector(
        (state) => state.ui
    );
    const dispatch = useAppDispatch();
    const refSplideMain = useRef<Splide>(null);

    const [booksFiltered, setBooksFiltered] = useState<BooksBase[]>([]);
    const [books, setBooks] = useState<BooksBase[]>([]);

    interface swipedElements {
        imgId: string;
        swipedFor: "like" | "dislike";
        status: "pending" | "processed";
    }

    const [swiped, setSwiped] = useState<swipedElements[]>([]);

    const animateSlider = () => {
        document
            .getElementById("mainSlider")
            ?.classList.remove("animate-pulseEaseInOnce");
        setTimeout(() => {
            document
                .getElementById("mainSlider")
                ?.classList.add("animate-pulseEaseInOnce");
        }, 10);
    };

    useEffect(() => {
        const INITIAL_DATA = [...(DATA as BooksBase[])].filter(
            ({ img }) => !swiped.some((swp) => swp.imgId === img)
        );

        if (homeSelectedFilters.length > 0) {
            let tempBooks = [...INITIAL_DATA]
                .filter((book) => !favs.some((fav) => fav?.img === book.img))
                .sort(() => Math.random() - 0.5);
            tempBooks = [
                ...tempBooks.filter((e) =>
                    homeSelectedFilters.includes(e.genre)
                ),
            ];
            const FIRST_BOOKS = [...tempBooks.splice(0, 2)];
            tempBooks = [
                ...tempBooks.filter((book) => !FIRST_BOOKS.includes(book)),
            ];
            animateSlider();
            setBooks([...FIRST_BOOKS]);

            setBooksFiltered(
                tempBooks.filter((e) => homeSelectedFilters.includes(e.genre))
            );
        } else {
            let tempBooks = [...INITIAL_DATA]
                .filter((book) => !favs.some((fav) => fav?.img === book.img))
                .sort(() => Math.random() - 0.5);
            const FIRST_BOOKS = [...tempBooks.splice(0, 2)];
            tempBooks = [
                ...tempBooks.filter((book) => !FIRST_BOOKS.includes(book)),
            ];
            animateSlider();

            setBooks([...FIRST_BOOKS]);

            setBooksFiltered(tempBooks);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [homeSelectedFilters]);

    useEffect(() => {
        if (swiped.at(0)?.status === "pending") {
            const { imgId, swipedFor } = swiped.at(0)!;
            if (imgId) {
                const book = DATA.find(
                    (bookfind) => bookfind.img === imgId
                )! as BooksBase;

                const index = books.findIndex((b) => b.img === imgId);
                if (booksFiltered.length > 0) {
                    books.splice(index, 1, booksFiltered.pop()!);
                    // const newBooksArray: BooksBase[] = [
                    //     ...books.splice(index, 1, booksFiltered.pop()!),
                    // ];
                    // console.log(newBooksArray);
                    // setBooks(newBooksArray);
                }

                if (swipedFor === "like") {
                    dispatch(addFavBook(book));
                }
                setSwiped((prev) => {
                    let tempSwiped: swipedElements[] = [
                        {
                            imgId: prev[0].imgId,
                            swipedFor: prev[0].swipedFor,
                            status: "processed",
                        },
                        ...prev.slice(1),
                    ];

                    return tempSwiped;
                });
            }
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swiped.length]);

    return (
        <div className=" w-full ">
            <div className=" flex flex-col   md:px-10 container  bg-surfaceColor h-screen ">
                <div className="relative bg-slate-700 min-w-[320px] max-w-xs md:max-w-[390px] mt-20   md:mt-36">
                    <div className="absolute -top-5 left-[70%] md:left-[85%]  z-50">
                        <div
                            className=" outline outline-shadowColor bg-primary px-2 py-1 rounded-full flex justify-center items-center flex-row relative hover:bg-primaryVariant transition-opacity hover:cursor-pointer"
                            onClick={() => {
                                dispatch(toggleShowFilters(true));
                            }}
                        >
                            <div className="flex items-center mr-1">
                                <FilterIcon className="h-8 w-8 " />
                            </div>
                            <span className="text-md font-semibold bottom-1 text-textOnPrimaryColor">
                                Filtro
                            </span>
                        </div>
                        <div className="relative max-h-0 max-w-0 ">
                            <div
                                className={`absolute -right-12 z-30  ${
                                    showFilters ? " scale-100" : " scale-0"
                                }  transition-transform origin-top-right `}
                            >
                                <BookmarksFilter variant={"HOME"} />
                            </div>
                        </div>
                    </div>

                    {books.length > 0 && (
                        <Splide
                            id="mainSlider"
                            ref={refSplideMain}
                            hasTrack={false}
                            aria-label="Lateset Books"
                            options={{
                                arrowPath: ".",
                                classes: {
                                    arrows: "splide__arrows custom-arrow-container",
                                    arrow: "splide__arrow your-class-arrow",
                                    prev: "splide__arrow--prev custom-arrow ",
                                    next: "splide__arrow--next custom-arrow ",
                                },
                                pagination: false,
                                perPage: 1,
                                gap: "2rem",
                                type: "loop",
                            }}
                            onResize={(splide) => {
                                splide.refresh();
                            }}
                            onMoved={(splide, index, prev, dest) => {
                                splide.on("inactive", (slideComponent) => {
                                    const bookImg =
                                        slideComponent.slide.accessKey;

                                    if (!(dest > prev)) {
                                        setSwiped((swipedData) => [
                                            {
                                                imgId: bookImg,
                                                swipedFor: "like",
                                                status: "pending",
                                            },
                                            ...swipedData,
                                        ]);
                                    } else {
                                        setSwiped((swipedData) => [
                                            {
                                                imgId: bookImg,
                                                swipedFor: "dislike",
                                                status: "pending",
                                            },
                                            ...swipedData,
                                        ]);
                                    }

                                    splide.off("inactive");
                                });
                            }}
                            onMove={() => {}}
                            className="w-full md:max-w-[380px] "
                        >
                            <SplideTrack className="">
                                {books.map((book, index) => {
                                    if (
                                        swiped.some(
                                            (item) => item.imgId === book.img
                                        )
                                    )
                                        return (
                                            <SplideSlide
                                                key={index}
                                                className="mx-auto flex justify-center items-center border-2  "
                                            >
                                                <div className="bg-transparent h-full w-full p-5  relative flex items-center justify-center min-h-[500px]">
                                                    <span className="bg-secondary p-5 rounded-xl font-bold text-center text-textOnPrimaryColor">
                                                        No hay más datos que
                                                        coincidan con la
                                                        búsqueda
                                                    </span>
                                                </div>
                                            </SplideSlide>
                                        );
                                    else
                                        return (
                                            <Slide book={book} key={book.img} />
                                        );
                                })}
                                {books.length <= 1 && (
                                    <SplideSlide className="mx-auto flex justify-center items-center border-2  ">
                                        <div className="bg-transparent h-full w-full p-5  relative flex items-center justify-center min-h-[500px]">
                                            <span className="bg-secondary p-5 rounded-xl font-bold text-center text-textOnPrimaryColor">
                                                No hay más datos que coincidan
                                                con la búsqueda
                                            </span>
                                        </div>
                                    </SplideSlide>
                                )}
                            </SplideTrack>
                        </Splide>
                    )}
                </div>
            </div>
        </div>
    );
};
