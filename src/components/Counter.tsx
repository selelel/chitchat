"use client";

import { useState } from "react";

import {
  increment,
  selectCount,
  selectStatus,
} from "@/lib/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;
  console.log(status);
  return (
    <div>{status}
        <button onClick={() => dispatch(increment())}>Womp</button>
    </div>
    
  );
};
