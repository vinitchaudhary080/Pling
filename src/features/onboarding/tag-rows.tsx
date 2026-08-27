import { Tag } from '../../components/ui/tag'
import type { TagOption } from './types'

type TagRowsProps = {
  rows: TagOption[][]
  selected: string[]
  onToggle: (id: string) => void
}

/**
 * Renders Figma's explicit tag rows.
 *
 * In the design a three-chip row pins the first chip at its intrinsic width and
 * lets the remaining two share the leftover space; two-chip rows stay intrinsic
 * and left-aligned. That rule is reproduced here rather than relying on wrap,
 * which would break the row grouping at 327px.
 */
export const TagRows = ({ rows, selected, onToggle }: TagRowsProps) => (
  <div className="flex w-full flex-col gap-4">
    {rows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex w-full items-start gap-3">
        {row.map((option, index) => (
          <Tag
            key={option.id}
            label={option.label}
            icon={option.icon}
            selected={selected.includes(option.id)}
            onClick={() => onToggle(option.id)}
            className={row.length > 2 && index > 0 ? 'min-w-0 flex-1' : undefined}
          />
        ))}
      </div>
    ))}
  </div>
)
