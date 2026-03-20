import { Clock, Star, UserRoundPlus, Box } from 'lucide-react';

interface BottomNavProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
  userInitials?: string;
}

const navItems = [
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'shared', label: 'Shared', icon: UserRoundPlus },
  { id: 'workspaces', label: 'Workspaces', icon: Box },
  { id: 'account', label: 'Account', icon: null }, // uses avatar
];

export function BottomNav({ activeItem = 'recent', onItemClick, userInitials = 'LD' }: BottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Bottom Nav Bar */}
      <div
        className="flex items-center justify-around px-4"
        style={{
          backgroundColor: 'var(--sidebar)',
          borderTop: '1px solid var(--border-interactive)',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
          paddingTop: '10px',
          paddingBottom: '12px',
          height: '72px'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className="flex flex-col items-center justify-center gap-[4px] min-w-0 flex-1"
            >
              {item.id === 'account' ? (
                /* User avatar — outline circle same style as other nav icons */
                <div className="size-[24px] relative shrink-0 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke={isActive ? 'var(--primary)' : 'var(--muted-foreground)'}
                      strokeWidth="2"
                    />
                  </svg>
                  <span
                    className="absolute"
                    style={{
                      fontSize: '8px',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                      letterSpacing: '0.3px',
                      lineHeight: 1,
                    }}
                  >
                    {userInitials}
                  </span>
                </div>
              ) : Icon ? (
                <Icon
                  className="size-[24px]"
                  style={{
                    color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                    strokeWidth: 2
                  }}
                />
              ) : null}
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: '10px',
                  lineHeight: 'normal',
                  letterSpacing: 'var(--letter-spacing-md)',
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
