import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

type PresetType = 'Last 7 days' | 'This week' | 'This month' | 'This year' | 'Last year';

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  onClose
}: DateRangePickerProps) {
  // Initialize to show current month on the right (previous month on the left)
  const today = new Date();
  const initialMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [selectedPreset, setSelectedPreset] = useState<PresetType | null>(null);

  const applyPreset = (preset: PresetType) => {
    setSelectedPreset(preset);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (preset) {
      case 'This week': {
        const start = new Date(today);
        const day = start.getDay();
        const diff = start.getDate() - day;
        start.setDate(diff);
        const end = new Date(today); // Cap at today instead of end of week
        onDateChange(start, end);
        // Show the month containing the date range
        const startMonth = new Date(start.getFullYear(), start.getMonth(), 1);
        const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
        if (startMonth.getTime() === endMonth.getTime()) {
          // Same month - show previous month on left, current on right
          setCurrentMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() - 1, 1));
        } else {
          setCurrentMonth(startMonth);
        }
        break;
      }
      case 'This month': {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today); // Cap at today instead of end of month
        onDateChange(start, end);
        // Always show previous month on left, current month on right
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        break;
      }
      case 'This year': {
        const start = new Date(today.getFullYear(), 0, 1);
        const end = new Date(today); // Cap at today instead of end of year
        onDateChange(start, end);
        // Always show previous month on left, current month on right
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        break;
      }
      case 'Last 7 days': {
        const end = new Date(today);
        const start = new Date(today);
        start.setDate(today.getDate() - 6);
        onDateChange(start, end);
        // Show the month containing the date range
        const startMonth = new Date(start.getFullYear(), start.getMonth(), 1);
        const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
        if (startMonth.getTime() === endMonth.getTime()) {
          // Same month - show previous month on left, current on right
          setCurrentMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() - 1, 1));
        } else {
          setCurrentMonth(startMonth);
        }
        break;
      }
      case 'Last year': {
        const start = new Date(today.getFullYear() - 1, 0, 1);
        const end = new Date(today.getFullYear() - 1, 11, 31);
        onDateChange(start, end);
        // Show the last 2 months of previous year (November on left, December on right)
        setCurrentMonth(new Date(today.getFullYear() - 1, 10, 1)); // November of previous year
        break;
      }
    }
  };

  const handleDateClick = (date: Date) => {
    // Prevent selecting future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) {
      return;
    }
    
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      // Starting new selection
      onDateChange(normalizedDate, null); // Clear end date when starting new selection
      setSelectedPreset(null);
    } else if (normalizedDate < startDate) {
      // Clicked before start, make it the new start
      onDateChange(normalizedDate, null); // Clear end date
    } else {
      // Set end date
      onDateChange(startDate, normalizedDate);
    }
  };

  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const hasError = startDate && endDate && endDate < startDate;

  // Calculate if we can navigate to next month
  // The right calendar shows currentMonth + 1, so we need to ensure it doesn't exceed current month
  const todayMonth = new Date();
  todayMonth.setDate(1);
  todayMonth.setHours(0, 0, 0, 0);
  const rightCalendarMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const canGoNext = rightCalendarMonth < todayMonth;

  return (
    <div
      className="flex flex-col"
      style={{
        width: '640px',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--border-interactive)',
        borderRadius: 'var(--radius-12)',
        padding: '32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Presets */}
      <div className="flex gap-[8px] mb-[32px] flex-wrap">
        {(['Last 7 days', 'This week', 'This month', 'This year', 'Last year'] as PresetType[]).map((preset) => (
          <Button
            key={preset}
            variant="text"
            onClick={() => applyPreset(preset)}
            style={{
              backgroundColor: selectedPreset === preset ? 'var(--accent)' : undefined,
              color: selectedPreset === preset ? 'var(--primary)' : undefined,
            }}
          >
            {preset}
          </Button>
        ))}
      </div>

      {/* Error Message */}
      {hasError && (
        <div
          className="flex items-center gap-[8px] mb-[16px] px-[12px] py-[8px] rounded-lg"
          style={{
            backgroundColor: 'rgba(212, 24, 61, 0.1)',
            border: '1px solid var(--destructive)'
          }}
        >
          <AlertCircle className="size-[16px]" style={{ color: 'var(--destructive)' }} strokeWidth={2} />
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-14)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: 'var(--line-height-20)',
              color: 'var(--destructive)'
            }}
          >
            End date must be after start date
          </span>
        </div>
      )}

      {/* Calendars - Two side-by-side */}
      <div className="flex gap-[32px] mb-[16px]" style={{ flexDirection: 'row' }}>
        <CalendarView
          month={currentMonth}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          showPrevButton={true}
          showNextButton={false}
        />
        <CalendarView
          month={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)}
          startDate={startDate}
          endDate={endDate}
          onDateClick={handleDateClick}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          showPrevButton={false}
          showNextButton={canGoNext}
        />
      </div>

      {/* Clear button - only show if dates are selected */}
      {(startDate || endDate) && (
        <div className="flex justify-end pt-[12px]" style={{ borderTop: '1px solid var(--border)' }}>
          <Button
            variant="text"
            onClick={() => {
              onDateChange(null, null);
              setSelectedPreset(null);
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

interface CalendarViewProps {
  month: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  showPrevButton: boolean;
  showNextButton: boolean;
}

function CalendarView({
  month,
  startDate,
  endDate,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  showPrevButton,
  showNextButton
}: CalendarViewProps) {
  const monthName = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: (Date | null)[] = [];
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i));
  }

  const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
    if (!d1 || !d2) return false;
    // Normalize both dates to remove time components
    const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return date1.getTime() === date2.getTime();
  };

  const isInRange = (date: Date): boolean => {
    if (!startDate || !date) return false;
    
    const effectiveEnd = endDate;
    if (!effectiveEnd) return false;

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(effectiveEnd);
    end.setHours(0, 0, 0, 0);
    const current = new Date(date);
    current.setHours(0, 0, 0, 0);

    return current > start && current < end;
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-[12px]">
        <button
          onClick={onPrevMonth}
          disabled={!showPrevButton}
          className="p-[6px] rounded-lg transition-colors disabled:opacity-0"
          style={{
            backgroundColor: 'transparent',
            cursor: showPrevButton ? 'pointer' : 'default'
          }}
          onMouseEnter={(e) => {
            if (showPrevButton) {
              e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-[16px]" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
        </button>

        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-14)',
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: 'var(--line-height-20)',
            color: 'var(--primary)'
          }}
        >
          {monthName}
        </span>

        <button
          onClick={onNextMonth}
          disabled={!showNextButton}
          className="p-[6px] rounded-lg transition-colors disabled:opacity-0"
          style={{
            backgroundColor: 'transparent',
            cursor: showNextButton ? 'pointer' : 'default'
          }}
          onMouseEnter={(e) => {
            if (showNextButton) {
              e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Next month"
        >
          <ChevronRight className="size-[16px]" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-[4px] mb-[8px]">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div
            key={day}
            className="text-center"
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-11)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--line-height-20)',
              color: 'var(--muted-foreground)',
              padding: '4px'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-[4px]">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />;
          }

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const isToday = isSameDay(date, today);
          const inRange = isInRange(date);
          const isSelected = isStart || isEnd;
          const isFuture = date > today;

          return (
            <button
              key={index}
              onClick={() => onDateClick(date)}
              disabled={isFuture}
              onMouseEnter={(e) => {
                if (!isFuture) {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = inRange ? 'rgba(13, 153, 255, 0.18)' : 'var(--muted)';
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!isFuture) {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = inRange ? 'rgba(13, 153, 255, 0.12)' : 'transparent';
                  }
                }
              }}
              className="relative transition-colors"
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: isSelected ? '#0d99ff' : inRange ? 'rgba(13, 153, 255, 0.12)' : 'transparent',
                border: '2px solid transparent',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-14)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-20)',
                color: isFuture 
                  ? 'var(--muted-foreground)' 
                  : isSelected 
                    ? '#ffffff' 
                    : 'var(--foreground)',
                cursor: isFuture ? 'not-allowed' : 'pointer',
                opacity: isFuture ? 0.4 : 1
              }}
              aria-label={date.toLocaleDateString()}
              aria-selected={isSelected}
              aria-disabled={isFuture}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}