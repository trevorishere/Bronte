import { useOutletContext, useNavigate } from 'react-router';
import { Mail, ShieldUser, HelpCircle, ChevronRight, LogOut, BookOpen, MessageSquare, Moon, Sun } from 'lucide-react';
import { TopBar } from '../components/TopBar';

const roleColors: Record<string, { bg: string; text: string; badge: string }> = {
  Admin: { bg: '#934790', text: '#934790', badge: 'rgba(147,71,144,0.15)' },
  Owner: { bg: '#7669aa', text: '#7669aa', badge: 'rgba(118,105,170,0.15)' },
  Manager: { bg: '#ac4e4f', text: '#ac4e4f', badge: 'rgba(172,78,79,0.15)' },
  Creator: { bg: '#5165b5', text: '#5165b5', badge: 'rgba(81,101,181,0.15)' },
  Viewer: { bg: '#4b8f6c', text: '#4b8f6c', badge: 'rgba(75,143,108,0.15)' },
  Member: { bg: '#ac9445', text: '#ac9445', badge: 'rgba(172,148,69,0.15)' },
  Developer: { bg: '#b97930', text: '#b97930', badge: 'rgba(185,121,48,0.15)' },
  Editor: { bg: '#39869c', text: '#39869c', badge: 'rgba(57,134,156,0.15)' },
};

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const currentUser = {
  name: 'Lena Doe',
  email: 'lena.doe@university.edu',
  role: 'Admin',
  initials: 'LD',
  memberSince: 'Jan 2024',
};

interface SectionRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  destructive?: boolean;
}

function SectionRow({ icon, label, description, onClick, destructive = false }: SectionRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 transition-colors text-left"
      style={{ backgroundColor: 'transparent' }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div
        className="shrink-0 size-[40px] rounded-xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <div style={{ color: destructive ? 'var(--destructive)' : 'var(--muted-foreground)' }}>
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: '15px',
            color: destructive ? 'var(--destructive)' : 'var(--primary)',
            letterSpacing: 'var(--letter-spacing-md)',
          }}
        >
          {label}
        </p>
        {description && (
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: '13px',
              color: 'var(--muted-foreground)',
              letterSpacing: 'var(--letter-spacing-md)',
              marginTop: '2px',
            }}
          >
            {description}
          </p>
        )}
      </div>
      {!destructive && (
        <ChevronRight className="size-[18px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
      )}
    </button>
  );
}

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

interface SectionToggleRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  checked: boolean;
  onToggle: () => void;
}

function SectionToggleRow({ icon, label, description, checked, onToggle }: SectionToggleRowProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-4 px-5 py-4 transition-colors text-left"
      style={{ backgroundColor: 'transparent' }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div
        className="shrink-0 size-[40px] rounded-xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <div style={{ color: 'var(--muted-foreground)' }}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: '15px',
            color: 'var(--primary)',
            letterSpacing: 'var(--letter-spacing-md)',
          }}
        >
          {label}
        </p>
        {description && (
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: '13px',
              color: 'var(--muted-foreground)',
              letterSpacing: 'var(--letter-spacing-md)',
              marginTop: '2px',
            }}
          >
            {description}
          </p>
        )}
      </div>
      {/* Toggle switch */}
      <div
        className="shrink-0 relative"
        style={{
          width: '44px',
          height: '26px',
          borderRadius: '13px',
          backgroundColor: checked ? 'var(--primary)' : 'var(--switch-background)',
          transition: 'background-color 200ms ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '21px' : '3px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'white',
            transition: 'left 200ms ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </button>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-6">
      {title && (
        <p
          className="px-5 pb-2 pt-1"
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: 'var(--muted-foreground)',
          }}
        >
          {title}
        </p>
      )}
      <div
        style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-16)',
          border: '1px solid var(--border-interactive)',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function AccountPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Account"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />

      <div
        className="flex-1 overflow-y-auto pb-[72px] md:pb-8"
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Profile Card */}
        <div className="px-4 pt-6 pb-2 md:px-10 md:pt-10">
          <div
            className="flex items-center gap-5 p-5 rounded-2xl"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-interactive)',
            }}
          >
            {/* Avatar */}
            <div
              className="shrink-0 size-[64px] rounded-full flex items-center justify-center"
              style={{
                backgroundColor: roleColors[currentUser.role]?.bg ?? 'var(--primary)',
                fontSize: '22px',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              {currentUser.initials}
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <h2
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: '20px',
                  color: 'var(--primary)',
                  letterSpacing: 'var(--letter-spacing-md)',
                  lineHeight: 'normal',
                }}
              >
                {currentUser.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="size-[14px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
                <p
                  className="truncate"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: '13px',
                    color: 'var(--muted-foreground)',
                    letterSpacing: 'var(--letter-spacing-md)',
                  }}
                >
                  {currentUser.email}
                </p>
              </div>
              <div className="mt-2">
                <span
                  className="inline-block px-2 py-[3px] rounded-md"
                  style={{
                    backgroundColor: roleColors[currentUser.role]?.badge ?? 'var(--accent)',
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: '11px',
                    color: roleColors[currentUser.role]?.text ?? 'var(--primary)',
                    letterSpacing: '0.3px',
                  }}
                >
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 md:px-10">

          {/* Admin Section */}
          {currentUser.role === 'Admin' || currentUser.role === 'Owner' ? (
            <Section title="Administration">
              <SectionRow
                icon={<ShieldUser className="size-[20px]" strokeWidth={2} />}
                label="Admin Panel"
                description="Manage projects, accounts, teams & workspaces"
                onClick={() => navigate('/admin')}
              />
            </Section>
          ) : null}

          {/* Appearance Section */}
          <Section title="Appearance">
            <SectionToggleRow
              icon={isDarkMode ? <Moon className="size-[20px]" strokeWidth={2} /> : <Sun className="size-[20px]" strokeWidth={2} />}
              label="Dark Mode"
              description="Switch between light and dark theme"
              checked={isDarkMode}
              onToggle={() => onThemeToggle()}
            />
          </Section>

          {/* Help Section */}
          <Section title="Help & Resources">
            <SectionRow
              icon={<BookOpen className="size-[20px]" strokeWidth={2} />}
              label="Documentation"
              description="Guides, tutorials, and reference"
            />
            <div style={{ height: '1px', backgroundColor: 'var(--border-interactive)', margin: '0 20px' }} />
            <SectionRow
              icon={<MessageSquare className="size-[20px]" strokeWidth={2} />}
              label="Contact Support"
              description="Get help from our team"
            />
            <div style={{ height: '1px', backgroundColor: 'var(--border-interactive)', margin: '0 20px' }} />
            <SectionRow
              icon={<HelpCircle className="size-[20px]" strokeWidth={2} />}
              label="About Bronte"
              description="Version, licenses, and credits"
            />
          </Section>

          {/* Sign Out */}
          <Section>
            <SectionRow
              icon={<LogOut className="size-[20px]" strokeWidth={2} />}
              label="Sign Out"
              destructive
            />
          </Section>

        </div>
      </div>
    </div>
  );
}
