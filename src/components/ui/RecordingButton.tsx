import React from "react";

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
    <>
      {isActive ? (
        <button
          className="flex gap-2 items-center py-2 px-4 rounded-md border-2 border-red-600 bg-red-600 text-white text-sm font-bold"
          onClick={stopRecordingCallback}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-white animate-pulse"></span>
          <span>Recording</span>
        </button>
      ) : (
        <button
          className="flex gap-2 items-center py-2 px-4 rounded-md border-2 border-red-600 text-slate-800 text-sm font-bold hover:border-red-300 transition-all"
          onClick={startRecordingCallback}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>
          <span>Start Recording</span>
        </button>
      )}
    </>
  );
};
