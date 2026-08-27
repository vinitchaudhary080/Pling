/**
 * Two very soft colour washes behind the desktop layout.
 *
 * A flat #FAFAFA field reads as empty once the content only occupies the middle
 * of a 1440px viewport. These sit at 6-8% opacity — enough to give the page
 * depth, far too faint to compete with the cards.
 */
export const AmbientBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block">
    <div className="absolute -left-52 -top-40 size-[620px] rounded-full bg-brand-500/[0.06] blur-3xl" />
    <div className="absolute -bottom-56 -right-40 size-[660px] rounded-full bg-accent-500/[0.06] blur-3xl" />
  </div>
)
