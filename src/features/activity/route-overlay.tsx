import pinShape from '../../assets/illustrations/pin-shape.svg'
import pinPhoto from '../../assets/illustrations/pin-photo.jpg'

/**
 * The run route drawn over the map plate.
 *
 * Every child is positioned as a percentage of Figma's 375x650 Map frame, so
 * the whole composition scales together and the path stays registered to the
 * streets at any viewport — which a flattened export could not guarantee.
 */
export const RouteOverlay = () => (
  <>
    {/* Line 5 — the path is the exact vector exported from the design. */}
    <svg
      viewBox="0 0 178 196"
      fill="none"
      aria-hidden="true"
      className="absolute left-[29.92%] top-[25.18%] h-[30.15%] w-[47.47%]"
    >
      <path
        d="M33.8621 1.60333C46.3621 11.6033 71.3621 27.1033 71.3621 27.1033C71.3621 27.1033 46.6032 44.5611 43.6035 46.5612C40.6038 48.5612 69.6035 91.0612 80.6035 97.5612C84.3262 99.7609 1.60376 135.561 1.60376 135.561C1.6037 142.561 21.1037 193.061 21.1035 194.061C21.1034 195.061 96.6035 163.561 100.104 163.561C103.604 163.561 116.604 172.8 127.604 156.061C128.918 154.061 134.604 145.061 124.604 134.561C131.604 123.061 153.604 95.0612 176.104 77.0612"
        stroke="#1B85F3"
        strokeWidth="3.20659"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    {/* Finish marker. */}
    <span className="absolute left-[75.73%] top-[34.15%] flex aspect-square w-[5.6%] items-center justify-center rounded-full border-2 border-brand-500 bg-white">
      <span className="block size-[54%] rounded-full bg-brand-500" />
    </span>

    {/* Photo pin at the start of the route. */}
    <span className="absolute left-[32.27%] top-[12.92%] block aspect-[51.3/72.7] w-[13.68%]">
      <img src={pinShape} alt="" aria-hidden="true" className="absolute inset-0 size-full" />
      <img
        src={pinPhoto}
        alt=""
        aria-hidden="true"
        className="absolute left-[12.5%] top-[10.3%] aspect-square w-[75%] rounded-full object-cover drop-shadow-[0px_6px_5px_rgba(45,45,45,0.16)]"
      />
    </span>
  </>
)
