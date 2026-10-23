import React from "react";

/**
 * Image placeholder — replace `heroImage` import below with your actual
 * image when ready, e.g.:
 *   import heroImage from "../../assets/hero_photo.png";
 * Then swap  `src={heroImage}`  in the <img> tag.
 */
const heroImage = null; // ← set your image import here later

const ComputersCanvas = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-2 sm:pr-6 pointer-events-none select-none">
      <div
        className="
          relative
          w-[380px] h-[240px]
          sm:w-[500px] sm:h-[310px]
          lg:w-[640px] lg:h-[400px]
          mt-16
          rounded-2xl
          overflow-hidden
          border-2 border-dashed border-[#1591DC]/30
          flex items-center justify-center
        "
      >
        {heroImage ? (
          /* ── real image (add when ready) ── */
          <img
            src={heroImage}
            alt="ACM-W hero"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          /* ── placeholder shown until image is provided ── */
          <div className="flex flex-col items-center gap-3 opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-[#1591DC]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 4.5h18A1.5 1.5 0 0122.5 6v12A1.5 1.5 0 0121 19.5H3A1.5 1.5 0 011.5 18V6A1.5 1.5 0 013 4.5z"
              />
            </svg>
            <span className="text-[#1591DC] text-[13px] font-medium tracking-wide">
              Image goes here
            </span>
          </div>
        )}

        {/* subtle blue glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5EAD]/10 via-transparent to-[#1591DC]/10 pointer-events-none rounded-2xl" />
      </div>
    </div>
  );
};

export default ComputersCanvas;
