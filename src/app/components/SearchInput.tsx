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
    const [isFocused, setIsFocused] = useState(false);
    return (
      <div
        className={`flex items-center gap-[12px] px-[12px] h-[40px] rounded-[12px] ${containerClassName}`}
        style={{
          backgroundColor: 'var(--bg-search)',
          border: `1px solid ${isHovered ? 'var(--border-interactive-hover)' : 'var(--border)'}`,
          transition: 'border-color var(--duration-fast) var(--ease-standard)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Search
          className="size-[16px] shrink-0"
          style={{
            color: isFocused ? 'var(--foreground)' : isHovered ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)',
            transition: 'color 300ms cubic-bezier(0.2,0,0.5,1)',
          }}
          strokeWidth={2}
        />
        <input
          ref={ref}
          {...inputProps}
          className={`flex-1 bg-transparent placeholder:text-[var(--muted-foreground)] ${inputProps.className ?? ''}`}
          onFocus={e => { setIsFocused(true); inputProps.onFocus?.(e); }}
          onBlur={e => { setIsFocused(false); inputProps.onBlur?.(e); }}
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
