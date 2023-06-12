"use client";

import { useAppSelector } from "@/store/hook";
import { useEffect, useRef } from "react";

export const Notification = () => {
    const { newFavNotifications } = useAppSelector((state) => state.book);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (newFavNotifications > 0 && ref.current) {
            ref.current.classList.add("animate-pulseEaseNotification");
            setTimeout(() => {
                ref.current!.classList.remove("animate-pulseEaseNotification");
            }, 1000);
        }
    }, [newFavNotifications]);

    return (
        <div
            className={` ${
                (newFavNotifications || 0) < 1 && "hidden"
            } rounded-full absolute -top-[35%] right-[5%] bg-secondaryVariant min-h-[30px] min-w-[30px] text-textOnPrimaryColor z-50 flex items-center justify-center border-2 border-textOnBackgroundColor`}
            ref={ref}
        >
            <span className=" text-center font-semibold text-sm  ">{`${
                (newFavNotifications || 0) > 9 ? "+" : ""
            }${Math.min(newFavNotifications, 9)}`}</span>
        </div>
    );
};
