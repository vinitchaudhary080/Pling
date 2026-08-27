import { Link } from 'react-router-dom'
import { ArrowsMaximizeIcon } from '../../components/icons/line-icons'
import routeMap from '../../assets/illustrations/route-map.png'
import pinShape from '../../assets/illustrations/pin-shape.svg'
import pinPhoto from '../../assets/illustrations/pin-photo.jpg'
import { TimerCard } from './timer-card'

/**
 * The map panel: the exported route raster, a photo pin, the dark expand
 * button and the floating timer card. Sized 327x282 on mobile and allowed to
 * grow taller on wide viewports where there is room for it.
 */
export const RouteMap = ({ interactive = true }: { interactive?: boolean }) => (
  <div className="relative h-[282px] w-full overflow-hidden rounded-tile md:h-[380px] lg:h-auto lg:min-h-[420px] lg:flex-1">
    {/* Bled slightly past the card so the plate's own rounded corners fall
        outside the clip and the card's radius is the only one that shows. */}
    <img
      src={routeMap}
      alt="Map of today's running route"
      className="absolute left-[-2%] top-[-2%] h-[104%] w-[104%] max-w-none object-cover"
    />

    {/* Photo pin marking the start of the route. */}
    <div className="absolute left-[33.6%] top-[6.4%] aspect-[51/73] w-[15.7%]">
      <img src={pinShape} alt="" aria-hidden="true" className="absolute inset-0 size-full" />
      <img
        src={pinPhoto}
        alt=""
        aria-hidden="true"
        className="absolute left-[12.5%] top-[10.3%] aspect-square w-[75%] rounded-full object-cover drop-shadow-[0px_6px_5px_rgba(45,45,45,0.16)]"
      />
    </div>

    {interactive ? (
      <Link
        to="/map"
        aria-label="Expand the map"
        className="absolute right-3 top-3 flex items-center justify-center rounded-card bg-[#2A3240] p-[9px] text-white transition-opacity hover:opacity-90"
      >
        <ArrowsMaximizeIcon className="size-5" />
      </Link>
    ) : null}

    <TimerCard distanceKm="10.4" duration="2:23:45" to="/map" />
  </div>
)
