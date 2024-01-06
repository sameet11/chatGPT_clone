import React from "react";
import PromptOption from "./promptoption";
import { type prompOption } from "@/types";
const SuggestedPrompts = () => {
  const arr: prompOption = [
    {
      h1: "Brainstorm Names",
      p: "for my fantasy football team with a frog theme",
    },
    {
      h1: "Write a spreadsheet formula",
      p: "to convert a day to weekday",
    },
    {
      h1: "Plan an iteinery",
      p: "for a fashion-focused exploration of paris",
    },
    {
      h1: "Tell me a fun fact",
      p: "about the Roman Empire",
    },
  ];
  return (
    <div className="w-full lg:w-2/3 mx-auto mt-[120px]">
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
        {/* Individual suggestion boxes */}
        <PromptOption arr={arr} />
      </div>
    </div>
  );
};

export default SuggestedPrompts;
