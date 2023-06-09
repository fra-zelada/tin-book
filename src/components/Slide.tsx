"use client";
import { BooksBase } from "@/interfaces/booksBase";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FC, useEffect, useRef } from "react";

interface Props {
    book: BooksBase;
}

export const Slide: FC<Props> = ({ book }) => {
    const refSplide = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refSplide.current) {
            const divSlide = refSplide.current;
            let clicking: boolean = false;
            let initialPosition = 0;
            const elements = document.querySelectorAll(".custom-arrow");
            const likeButton = elements[0];
            const dislikeButton = elements[1];

            const checkPosition = () => {
                if (clicking && refSplide.current) {
                    if (
                        initialPosition <
                        refSplide.current.getBoundingClientRect().x
                    ) {
                        if (
                            !likeButton.classList.contains("custom-arrow-like")
                        ) {
                            likeButton.classList.add("custom-arrow-like");
                            dislikeButton.classList.remove(
                                "custom-arrow-dislike"
                            );
                        }
                    } else {
                        if (
                            !dislikeButton.classList.contains(
                                "custom-arrow-dislike"
                            )
                        ) {
                            dislikeButton.classList.add("custom-arrow-dislike");
                            likeButton.classList.remove("custom-arrow-like");
                        }
                    }
                }
            };

            const mouseDown = () => {
                clicking = true;
                if (refSplide.current) {
                    initialPosition =
                        refSplide.current.getBoundingClientRect().x;
                }
            };
            const mouseUp = () => {
                dislikeButton.classList.remove("custom-arrow-dislike");
                likeButton.classList.remove("custom-arrow-like");

                clicking = false;
            };

            // Ejecuta la verificación de posición cuando se mueve el div
            divSlide.addEventListener("touchstart", mouseDown);
            divSlide.addEventListener("mousedown", mouseDown);
            divSlide.addEventListener("mouseup", mouseUp);
            divSlide.addEventListener("touchend", mouseUp);
            divSlide.addEventListener("mousemove", checkPosition);
        }

        return () => {
            if (refSplide.current) {
                refSplide.current.removeEventListener("mousedown", () => {});

                refSplide.current.removeEventListener("mouseup", () => {});
                refSplide.current.removeEventListener("touchstart", () => {});
                refSplide.current.removeEventListener("touchend", () => {});

                // eslint-disable-next-line react-hooks/exhaustive-deps
                refSplide.current.removeEventListener("mousemove", () => {});
            }
        };
    }, []);

    return (
        <SplideSlide
            key={book?.img}
            className="mx-auto flex justify-center items-center border-2  "
            accessKey={book?.img}
        >
            <div
                ref={refSplide}
                id="child-slide"
                className="bg-gradient-to-b from-transparent to-bgColor w-[320px] md:w-[370px] h-[500px] flex items-center justify-center "
            >
                <Splide
                    hasTrack={true}
                    aria-label="..."
                    options={{
                        pagination: true,
                        perPage: 1,
                        gap: "2rem",
                        type: "slide",
                        direction: "ttb",
                        height: "500px",
                        wheel: true,
                    }}
                    className="max-w-[400px] w-full flex items-center justify-center"
                >
                    <SplideSlide>
                        <div className="bg-transparent h-full w-full p-5  relative flex items-center justify-center ">
                            <div className="relative">
                                <picture>
                                    <img
                                        src={`${book?.img}`}
                                        alt=""
                                        className="min-h-[350px] mx-auto rounded-md  shadow-shadowColor shadow-lg -translate-y-2"
                                    />
                                </picture>
                            </div>
                            <div className="absolute top-11 left-[50%] right-[50%]  flex items-center justify-center ">
                                <span className="bg-secondary text-textOnSecondaryColor whitespace-nowrap rounded-lg py-1 px-2 outline outline-borderColor font-medium text-sm opacity-90 shadow-md shadow-shadowColor">
                                    {`${book?.author[0]} ✍️`}
                                </span>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="paper no-scrollbar">
                            <div className="paper-content">
                                <div className="paper-text">
                                    <span className="block invisible">.</span>
                                    <span> {book?.title} </span>
                                    <p className="indent-10 text-justify whitespace-pre-line ">
                                        {book?.description}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-0 left-8 opacity-90">
                                <span className="text-xs md:text-md font-semibold bg-secondary text-textOnSecondaryColor px-4 py-1 rounded-xl border border-borderColor shadow shadow-shadowColor whitespace-nowrap">
                                    {book?.genre}
                                </span>
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </SplideSlide>
    );
};
