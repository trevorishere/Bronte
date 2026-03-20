import { Clock, Star, UserRoundPlus, ShieldUser, Box } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { getWorkspaceInitials } from './WorkspaceIcon';
import { motion, AnimatePresence } from 'motion/react';

interface Workspace {
  id: string;
  name: string;
}

interface BottomNavProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
  workspaces?: Workspace[];
}

const navItems = [
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'shared', label: 'Shared', icon: UserRoundPlus },
  { id: 'admin', label: 'Admin', icon: ShieldUser },
  { id: 'workspaces', label: 'Workspaces', icon: Box },
];

export function BottomNav({ activeItem = 'recent', onItemClick, workspaces = [] }: BottomNavProps) {
  const [isWorkspacesMenuOpen, setIsWorkspacesMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsWorkspacesMenuOpen(false);
      }
    };

    if (isWorkspacesMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWorkspacesMenuOpen]);

  const handleNavClick = (id: string) => {
    if (id === 'workspaces') {
      setIsWorkspacesMenuOpen(!isWorkspacesMenuOpen);
    } else {
      onItemClick?.(id);
      setIsWorkspacesMenuOpen(false);
    }
  };

  const handleWorkspaceClick = (workspaceId: string) => {
    onItemClick?.(workspaceId);
    setIsWorkspacesMenuOpen(false);
  };

  return (
    <div 
      ref={menuRef}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Workspaces Menu Dropdown */}
      <AnimatePresence>
        {isWorkspacesMenuOpen && (
          <motion.div 
            className="absolute bottom-[80px] left-24 right-2 bg-background shadow-lg overflow-hidden p-[8px]"
            style={{ 
              border: '1px solid var(--border-interactive-hover)',
              borderRadius: 'var(--radius-24)',
              maxHeight: '300px',
              overflowY: 'auto',
              transformOrigin: 'bottom right'
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ 
              duration: 0.25,
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
          >
            <div className="px-2 pt-[4px] pb-4">
              <p 
                className="text-muted-foreground px-[12px] py-2"
                style={{ 
                  fontFamily: 'var(--font-family)', 
                  fontWeight: 'var(--font-weight-medium)', 
                  fontSize: 'var(--font-size-11)', 
                  textTransform: 'uppercase', 
                  letterSpacing: 'var(--letter-spacing-md)' 
                }}
              >
                Team Workspaces
              </p>
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => handleWorkspaceClick(workspace.id)}
                  className="w-full flex items-center gap-3 px-[12px] py-[10px] transition-colors rounded-xl"
                  style={{ 
                    backgroundColor: activeItem === workspace.id ? 'var(--muted)' : 'transparent',
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-14)',
                    letterSpacing: 'var(--letter-spacing-md)',
                    lineHeight: 'var(--line-height-20)',
                    color: activeItem === workspace.id ? 'var(--primary)' : 'var(--foreground)',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    if (activeItem !== workspace.id) {
                      e.currentTarget.style.backgroundColor = 'var(--muted)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeItem !== workspace.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }
                  }}
                >
                  <div className="shrink-0 size-[20px]">
                    <div className="relative size-full">
                      <svg 
                        className="size-full" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect 
                          x=".5" 
                          y=".5" 
                          width="19" 
                          height="19" 
                          rx="4" 
                          stroke={activeItem === workspace.id ? 'var(--primary)' : 'var(--foreground)'} 
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p style={{ 
                          fontFamily: 'var(--font-family)', 
                          fontWeight: 'var(--font-weight-)', 
                          fontSize: '9px', 
                          letterSpacing: 'var(--letter-spacing-sm)',
                          whiteSpace: 'nowrap',
                          color: activeItem === workspace.id ? 'var(--primary)' : 'var(--foreground)'
                        }}>
                          {getWorkspaceInitials(workspace.name)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="truncate">
                    {workspace.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav Bar */}
      <div 
        className="flex items-center justify-around px-2"
        style={{
          backgroundColor: 'var(--sidebar)',
          borderTop: '1px solid var(--muted)',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
          paddingTop: '12px',
      
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'workspaces' 
            ? workspaces.some(w => w.id === activeItem)
            : activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex flex-col items-center justify-center gap-[6px] min-w-0 flex-1"
            >
              <Icon 
                className="size-[24px]" 
                style={{ 
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                  strokeWidth: 2
                }} 
              />
              <span 
                style={{ 
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
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
