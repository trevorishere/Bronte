import { forwardRef, useState } from 'react';
import { Search } from 'lucide-react';

/**
 * SearchInput — shared search bar spec used by Sidebar and FilterDropdown.
 *
 * Design tokens:
 *   gap-[12px] | px-[12px] | py-[10px] | rounded-[12px]
 *   border: 1px solid var(--border)
 *   icon: size-[20px], var(--muted-foreground)
 *   text: font-weight-medium, font-size-15, letterSpacing 0.3px
 */
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ containerClassName = '', ...inputProps }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        className={`flex items-center gap-[12px] px-[12px] h-[40px] rounded-[12px] ${containerClassName}`}
        style={{
          border: `1px solid ${isHovered ? 'var(--border-interactive)' : 'var(--border)'}`,
          transition: 'border-color var(--duration-fast) var(--ease-standard)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Search
          className="size-[20px] shrink-0"
          style={{ color: 'var(--muted-foreground)' }}
          strokeWidth={2}
        />
        <input
          ref={ref}
          {...inputProps}
          className={`flex-1 bg-transparent placeholder:text-[var(--border-interactive)] ${inputProps.className ?? ''}`}
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-15)',
            letterSpacing: 'var(--letter-spacing-body)',
            lineHeight: 'var(--line-height-20)',
            color: 'var(--foreground)',
            outline: 'none',
            ...inputProps.style,
          }}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
