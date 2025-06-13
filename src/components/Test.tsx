import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Test = () => {
  const state = useSelector((state: RootState) => state.counter);

  console.log(state, "state");
  return <div>Counter: {state.value}</div>;
};

export default Test;
