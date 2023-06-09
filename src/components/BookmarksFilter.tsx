"use client";

import { Genre } from "@/interfaces/booksBase";
import {
    setBookmarksSelectedFilters,
    toggleShowFilters,
    setHomeSelectedFilters,
} from "@/slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { CloseIcon } from "./Icons";

interface Props {
    variant: "HOME" | "BOOKMARKS";
}

export const BookmarksFilter: FC<Props> = ({ variant }) => {
    const { ui } = useAppSelector((state) => state);
    const [selectedFilters, setSelectedFilters] = useState<Genre[]>([]);
    const [selectAllFilters, setSelectAllFilters] = useState<boolean>(true);
    const filterOptions: Genre[] = Object.values(Genre);
    const dispatch = useAppDispatch();

    const componentRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                componentRef.current &&
                !componentRef.current.contains(event.target as Node)
            ) {
                dispatch(toggleShowFilters(false));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (ui.showFilters)
            document.addEventListener("click", handleClickOutside);
        return () => {
            if (ui.showFilters)
                document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside, ui.showFilters]);

    const toggleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectAllFilters(e.target.checked);
        if (e.target.checked) {
            setSelectedFilters([...filterOptions]);
        } else {
            setSelectedFilters([]);
        }
    };

    const updateFiltersState = useCallback(() => {
        if (variant === "BOOKMARKS")
            dispatch(setBookmarksSelectedFilters([...selectedFilters]));
        if (variant === "HOME")
            dispatch(setHomeSelectedFilters([...selectedFilters]));
    }, [dispatch, selectedFilters, variant]);

    const handleCheckFilter = (
        e: ChangeEvent<HTMLInputElement>,
        filter: Genre
    ) => {
        if (e.target.checked) {
            if (!selectedFilters?.includes(filter))
                setSelectedFilters([...selectedFilters, filter]);
        } else {
            setSelectedFilters(
                selectedFilters.filter((option) => option !== filter)
            );
            setSelectAllFilters(false);
        }

        updateFiltersState();
    };

    useEffect(() => {
        if (selectedFilters.length === filterOptions.length)
            setSelectAllFilters(true);
        else {
            setSelectAllFilters(false);
        }
        updateFiltersState();

        return () => {};
    }, [filterOptions.length, selectedFilters, updateFiltersState]);

    useEffect(() => {
        variant === "HOME"
            ? setSelectedFilters([...ui.homeSelectedFilters])
            : variant === "BOOKMARKS"
            ? setSelectedFilters([...ui.bookmarksSelectedFilters])
            : setSelectedFilters([...filterOptions]);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={componentRef}
            className="min-w-max bg-bgColor  flex items-stretch justify-start  border border-borderColor p-5 rounded-lg text-textOnBackgroundColor flex-col relative shadow-xl shadow-shadowColor"
        >
            <div
                className="absolute top-1 right-1"
                onClick={() => {
                    dispatch(toggleShowFilters(false));
                }}
            >
                <CloseIcon className="fill-secondaryVariant stroke-textOnSecondaryColor rounded cursor-pointer" />
            </div>
            <div className="flex flex-col items-start justify-start text-left">
                <span className="  mx-auto md:mx-0">Categorías:</span>
                <ul className="md:space-y-1 flex flex-col xl:grid xl:grid-cols-2 xl:space-x-3">
                    <li>
                        <label
                            htmlFor="all"
                            className="select-none cursor-pointer xl:ml-3"
                        >
                            <input
                                type="checkbox"
                                name="filter"
                                id="all"
                                className="mr-1"
                                checked={selectAllFilters}
                                onChange={toggleSelectAll}
                            />
                            Todos
                        </label>
                    </li>
                    {filterOptions.map((filter) => (
                        <li key={filter}>
                            <label
                                htmlFor={filter}
                                className="select-none cursor-pointer "
                            >
                                <input
                                    type="checkbox"
                                    name="filter"
                                    value={filter}
                                    id={filter}
                                    checked={selectedFilters?.includes(filter)}
                                    onChange={(e) =>
                                        handleCheckFilter(e, filter)
                                    }
                                    className="mr-1"
                                />
                                {filter}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
