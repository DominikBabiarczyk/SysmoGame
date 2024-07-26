import { useState } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  DateValue,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";

export const DatePickerComponent = ({
  onChange,
  value,
}: {
  onChange: (v: Date) => void;
  value: Date;
}) => {
  const [selectedDate, setSelectedDate] = useState(value);

  const convertToDate = (dateObj: DateValue) => {
    const { day, month, year } = dateObj;
    return new Date(year, month - 1, day);
  };

  const handleDateChange = (newDate: DateValue) => {
    const convertedDate = convertToDate(newDate);
    setSelectedDate(convertedDate);
    if (onChange) {
      onChange(convertedDate);
    }
  };
  return (
    <DatePicker className="flex h-[30px] w-full items-center  px-2">
      <Group className="flex flex-row gap-3">
        <DateInput className="flex flex-row">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="absolute right-[20px]">▼</Button>
      </Group>
      <Popover>
        <Dialog className="bg-white p-3 shadow-md">
          <Calendar onChange={handleDateChange}>
            <header className="mb-3 flex flex-row items-center justify-center gap-3">
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => (
                <CalendarCell
                  className="p-2 text-center transition-all hover:bg-slate-100"
                  date={date}
                />
              )}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
};
