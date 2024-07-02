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
    <div>
      {isActive ? (
        <button onClick={stopRecordingCallback}>Recording</button>
      ) : (
        <button
          className="flex gap-2 content-center py-2 px-4 rounded-md border-2 border-red-600 text-slate-800 hover:bg-red-600"
          onClick={startRecordingCallback}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>
          <span>Start recording</span>
        </button>
      )}
    </div>
  );
};
