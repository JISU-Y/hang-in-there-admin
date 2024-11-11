'use client';
import { Button } from '@domains/common/components/ui/button';
import { Calendar } from '@domains/common/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@domains/common/components/ui/popover';
import { cn } from '@logics/utils/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import * as React from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

interface CalendarDateRangePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSelectDate?: (date?: DateRange) => void;
}

export function CalendarDateRangePicker({
  className,
  onSelectDate
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });

  const handleSelectDate: SelectRangeEventHandler = (date) => {
    setDate(date);
    onSelectDate?.(date);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
