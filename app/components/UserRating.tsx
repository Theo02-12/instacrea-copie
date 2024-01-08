"use client";
import React from "react";
import { Avatar, Rating } from "@material-tailwind/react";

interface Rate {
  rating: {
    rating: number;
    comment?: string;
    date: Date;
    user:
      | {
          firstname?: string;
          lastname?: string;
          avatar?: string;
        }
      | undefined;
  }[];
}
export default function UserRating({ rating }: Rate) {
  return (
    <div>
      {rating.map((rate, i) => {
        return (
          <div
            key={i}
            className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow  md:max-w-lg m-2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-3 flex items-center">
              <Avatar
                size="sm"
                alt="candice wu"
                className="w-10 h-10 rounded-full border-2 me-2 border-blue-500 object-cover"
                src={rate.user?.avatar}
              />
              <div className="flex flex-col">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {rate.user?.firstname +
                    "." +
                    rate.user?.lastname?.split("")[0]}
                </h5>
                <p className="font-light">{`${rate.date.getDate()}/${rate.date.getMonth()}/${rate.date.getFullYear()}`}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-4 leading-normal">
              <Rating
                value={rate.rating}
                readonly
                unratedColor="red"
                ratedColor="red"
              />
              <p className="py-1 font-normal text-gray-700 dark:text-gray-400">
                {rate.comment}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
