"use client";

import { useState } from "react";

import {
  increment,
  selectCount,
  selectStatus,
} from "@/lib/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTestQueryQuery } from "@/services/womp";
// const dispatch = useAppDispatch();
// const count = useAppSelector(selectCount);
// const status = useAppSelector(selectStatus);
// const [incrementAmount, setIncrementAmount] = useState("2");


export const Counter = () => {
    const { data, error, isLoading } = useTestQueryQuery({});
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Test Query Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
