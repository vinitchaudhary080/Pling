import workoutPlan from '../../assets/illustrations/workout-plan.png'

/**
 * The stacked hero on the dashboard: a Blue 500 promo card with two tinted
 * cards peeking out beneath it (Figma layers them with negative margins, which
 * is what produces the "deck of cards" depth).
 */
export const WorkoutPlanCard = () => (
  <div className="flex w-full flex-col items-center">
    <article className="relative z-20 flex h-[130px] w-full items-center justify-between overflow-hidden rounded-card border border-grey-100 bg-brand-500 px-5 py-4 shadow-card">
      <div className="relative z-10 flex flex-col gap-1">
        <p className="text-lg font-bold leading-[26px] text-white">
          Create your Custom
          <br />
          Workout Plan
        </p>
        <p className="text-xs font-medium leading-4 text-grey-150">Training&amp;Nutrition</p>
      </div>

      {/* Figma exports this as the card's right-hand 174x130 region — it already
          carries the Blue 500 ground and the concentric deco rings, so it butts
          flush against the card edge rather than floating on top of it. */}
      <img
        src={workoutPlan}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -top-px h-[132px] w-[176px] select-none object-cover"
      />
    </article>

    {/* Decorative stack beneath the hero. */}
    <div aria-hidden="true" className="z-10 h-[13px] w-[calc(100%-32px)] rounded-b-card bg-[#CCE1F7] shadow-[0px_3px_15px_-1.5px_rgba(50,50,71,0.02)]" />
    <div aria-hidden="true" className="h-[12px] w-[calc(100%-64px)] rounded-b-card bg-[#CCE1F7] opacity-30" />
  </div>
)
