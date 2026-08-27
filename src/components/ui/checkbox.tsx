import { CheckboxCheckedIcon } from '../icons/glyphs'

/** 16px square checkbox from the Step 8 benefit cards (4px radius). */
export const Checkbox = ({ checked }: { checked: boolean }) =>
  checked ? (
    <CheckboxCheckedIcon className="size-4" />
  ) : (
    <span className="block size-4 rounded border border-grey-300 bg-white" aria-hidden="true" />
  )
