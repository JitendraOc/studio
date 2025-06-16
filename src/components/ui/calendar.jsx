"use client"

import * as React from "react"
import { Calendar as AntCalendar } from "antd"
// import { ChevronLeft, ChevronRight } from "lucide-react" // AntD Calendar has its own icons
// import { DayPicker } from "react-day-picker" // Replaced by AntD Calendar
import dayjs from "dayjs"; // AntD uses Day.js

import { cn } from "@/lib/utils.js"
// import { buttonVariants } from "@/components/ui/button.jsx" // Styling for buttons is now AntD internal

// export type CalendarProps = React.ComponentProps<typeof DayPicker>
// CalendarProps will now be based on AntD Calendar's props

// Helper to convert Date to Dayjs object if needed
const toDayjs = (date) => {
  if (!date) return undefined;
  if (dayjs.isDayjs(date)) return date;
  return dayjs(date);
};

// Helper to convert Dayjs to Date object if needed for onSelect compatibility
const fromDayjs = (dayjsDate) => {
  if (!dayjsDate) return undefined;
  return dayjsDate.toDate();
};


function Calendar({
  className,
  // classNames, // Specific to react-day-picker, removed
  // showOutsideDays = true, // Handled by AntD

  // react-day-picker props to map:
  mode, // "single", "multiple", "range"
  selected,
  onSelect,
  month, // initial month
  onMonthChange,

  // Other DayPicker props might need mapping or might not be applicable
  // numberOfMonths, fromDate, toDate, disabled, modifiers, etc.

  // AntD Calendar specific props can also be passed directly
  // value, defaultValue, onChange, onPanelChange, fullscreen, etc.
  ...props
}) {

  // Map DayPicker props to AntD Calendar props
  const antdProps = { ...props };

  if (mode === "range") {
    // AntD Calendar supports range selection if 'value' is an array of two Dayjs objects.
    // Or by using two DatePicker components. For a single Calendar component,
    // it's more about display and navigating months/years.
    // Range selection is typically done with DatePicker.RangePicker.
    // For now, we'll assume 'single' mode if 'mode' is not 'range'.
    // If 'selected' is an array for range, it needs to be converted.
    console.warn("Calendar: AntD Calendar range selection is different. Consider DatePicker.RangePicker for range input.");
    if (Array.isArray(selected) && selected.length === 2) {
        antdProps.value = [toDayjs(selected[0]), toDayjs(selected[1])];
    } else {
        antdProps.value = toDayjs(selected); // Fallback or assume single
    }
  } else if (mode === "multiple") {
    // AntD Calendar doesn't directly support multiple arbitrary date selections in the same way as DayPicker.
    // This would require custom logic on top of AntD Calendar.
    console.warn("Calendar: AntD Calendar does not support 'multiple' selection mode directly like react-day-picker.");
    antdProps.value = toDayjs(selected); // Treat as single or expect selected to be single
  } else { // single mode or undefined
    antdProps.value = toDayjs(selected);
  }

  // Map onSelect (DayPicker) to onChange (AntD Calendar)
  // DayPicker onSelect: (date: Date | undefined, selectedDay: Date, activeModifiers: object, e: MouseEvent) => void
  // AntD onChange: (date: Dayjs) => void
  // AntD onSelect: (date: Dayjs, info: { source: 'date' | 'month' | 'year' | 'decade' }) => void
  // We'll use onSelect for closer behavior to DayPicker's onSelect, but only pass the date.
  if (onSelect) {
    antdProps.onSelect = (dayjsDate, { source }) => {
      if (source === 'date') { // Ensure it's a date selection
        onSelect(fromDayjs(dayjsDate), fromDayjs(dayjsDate), {}, null); // Emulate DayPicker's onSelect args
      }
    };
  }

  // Map month and onMonthChange
  // AntD Calendar controls its displayed month via 'value' or internal state.
  // 'onPanelChange' can be used to detect month/year changes.
  if (month && !antdProps.value) {
    // If 'month' is provided and 'value' (selected date) isn't, set initial display month.
    antdProps.defaultValue = toDayjs(month); // Or value if it should be controlled
  }
  if (onMonthChange) {
    antdProps.onPanelChange = (dayjsDate, mode) => {
      // mode can be 'month' or 'year'
      // DayPicker's onMonthChange passes the month (Date object)
      if (mode === 'month' || mode === 'year') {
        onMonthChange(fromDayjs(dayjsDate));
      }
    };
  }

  // Remove DayPicker specific props that don't map directly
  delete antdProps.classNames;
  delete antdProps.showOutsideDays;
  delete antdProps.components;
  delete antdProps.captionLayout;
  delete antdProps.modifiers;
  delete antdProps.modifiersClassNames;
  // ... any other DayPicker specific props

  return (
    <AntCalendar
      className={cn("p-0", className)} // Basic class, AntD Calendar has its own padding/layout
                                     // Original "p-3" might be too much or conflict.
      // The extensive classNames object from DayPicker for styling internal parts
      // is not applicable to AntD Calendar. Customization is via CSS override or less granular props.
      {...antdProps} // Spread the mapped and remaining props
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
