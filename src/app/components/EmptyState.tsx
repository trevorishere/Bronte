import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
}

export function EmptyState({ 
  title,
  description,
  message
}: EmptyStateProps) {
  // Support both patterns: message prop or title+description
  const displayTitle = title || (message ? 'No items yet' : 'No data available');
  const displayDescription = description || message || 'There are no items to display at this time.';

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-[80px]">
      <div className="flex flex-col items-center gap-[24px] max-w-[400px]">
        {/* Illustration */}
        <div className="relative">
          {/* Background circle */}
          <div 
            className="size-[120px] flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
          >
            {/* Inner circle */}
            <div 
              className="size-[80px] flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
            >
              <FileQuestion 
                className="size-[40px]" 
                style={{ color: 'var(--icon)', opacity: 0.4 }} 
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-[8px] text-center px-[24px]">
          {title && (
            <h3 
              style={{ 
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-18)',
                color: 'var(--foreground)',
                lineHeight: 'var(--line-height-18)'
              }}
            >
              {displayTitle}
            </h3>
          )}
          <p 
            style={{ 
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-14)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--line-height-20)'
            }}
          >
            {displayDescription}
          </p>
        </div>
      </div>
    </div>
  );
}