import React from "react";
import { Button } from "@material-tailwind/react";

interface PDFPreviewModalProps {
  fileContent: string;
  fileName: string;
  onClose: () => void;
  feedbackUrl?: string;
}

export function PDFPreviewModal({
  fileContent,
  fileName,
  onClose,
  feedbackUrl,
}: PDFPreviewModalProps) {
  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-[9999] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-8 bg-white rounded-xl z-[10000] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            {/* PDF Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">{fileName}</h3>
          </div>
          <div className="flex gap-3">
            {feedbackUrl && (
              <Button
                variant="filled"
                color="blue"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                onClick={() => window.open(feedbackUrl, "_blank")}
              >
                <span>Go to Feedback</span>
                {/* External Link Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </Button>
            )}
            <Button
              variant="text"
              color="gray"
              className="flex items-center gap-2"
              onClick={onClose}
            >
              <span>Close</span>
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <iframe
            src={fileContent}
            className="w-full h-full rounded-lg shadow-lg bg-white"
            title={fileName}
          />
        </div>
      </div>
    </>
  );
}
