/**
 * LoadingDots — three pulsing dots shown while
 * waiting for a Gemini response.
 */
export default function LoadingDots({ speakerLabel }) {
  return (
    <div className="flex items-start gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
        ···
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2.5">
        <p className="text-[11px] text-gray-400 mb-1">{speakerLabel}</p>
        <div className="flex gap-1.5 items-center h-4">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </div>
      </div>
    </div>
  );
}
