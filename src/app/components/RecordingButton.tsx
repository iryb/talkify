import React from "react";
import { DotsLoader } from "./ui/DotsLoader";

type RecordingButtonProps = {
  startRecordingCallback: () => void;
  stopRecordingCallback: () => void;
  isActive: boolean;
};

export const RecordingButton = ({
  startRecordingCallback,
  stopRecordingCallback,
  isActive,
}: RecordingButtonProps) => {
  return (
    <div>
      {isActive ? (
        <button
          className="flex gap-4 items-center py-2 px-4 rounded-md border-2 border-red-600 bg-red-600 text-white"
          onClick={stopRecordingCallback}
        >
          <DotsLoader />
          <span>Recording</span>
        </button>
      ) : (
        <button
          className="flex gap-2 items-center py-2 px-4 rounded-md border-2 border-red-600 text-slate-800 hover:scale-105 transition-all"
          onClick={startRecordingCallback}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>
          <span>Start recording</span>
        </button>
      )}
    </div>
  );
};
