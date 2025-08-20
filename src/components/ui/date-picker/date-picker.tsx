import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import type { DatePickerProps } from "./types";

import { Input } from "../input";
import { Select } from "../select";
import { Button } from "../button";
import { IoCalendarOutline } from "react-icons/io5";

export const DatePicker = ({
  mode = "single",
  value,
  onChange,
  placeholder = "Select date",
  format = "YYYY-MM-DD",
  className,
}: DatePickerProps) => {
  const isRange = mode === "range";

  const [internalValue, setInternalValue] = useState<
    Dayjs | [Dayjs | null, Dayjs | null] | null
  >(value || null);

  // Untuk range, viewMonths 2 bulan; single cukup 1 bulan yang fokus (index 0)
  const [viewMonths, setViewMonths] = useState<[Dayjs, Dayjs]>(() => [
    dayjs().startOf("month"),
    dayjs().add(1, "month").startOf("month"),
  ]);

  const [show, setShow] = useState(false);
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(value || null);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!show) {
      setHoverDate(null); // reset hover saat dropdown ditutup
      if (isRange) {
        const [start, end] = (internalValue as [
          Dayjs | null,
          Dayjs | null
        ]) || [null, null];
        if (start && !end) {
          setInternalValue(null);
          onChange?.(null);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const daysInMonthGrid = (month: Dayjs) => {
    const start = month.startOf("month").startOf("week");
    const end = month.endOf("month").endOf("week");
    const days: Dayjs[] = [];
    let day = start;
    while (day.isBefore(end) || day.isSame(end, "day")) {
      days.push(day);
      day = day.add(1, "day");
    }
    return days;
  };

  const handleSelectDate = (date: Dayjs) => {
    if (isRange) {
      const [start, end] = (internalValue as [Dayjs | null, Dayjs | null]) || [
        null,
        null,
      ];
      if (!start || (start && end)) {
        setInternalValue([date, null]);
        onChange?.([date, null]);
      } else if (start && !end) {
        const newRange: [Dayjs, Dayjs] = date.isBefore(start)
          ? [date, start]
          : [start, date];
        setInternalValue(newRange);
        onChange?.(newRange);
        setShow(false);
      }
    } else {
      setInternalValue(date);
      onChange?.(date);
      setShow(false);
    }
  };

  // Bulan & Tahun (untuk dropdown)
  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const years: { label: string; value: string }[] = [];
  const currentYear = dayjs().year();
  for (let y = currentYear - 50; y <= currentYear + 20; y++) {
    years.push({ label: y.toString(), value: y.toString() });
  }

  // Ambil info kiri & kanan bulan dan tahun dari viewMonths
  const leftMonth = viewMonths[0].month() + 1;
  const leftYear = viewMonths[0].year();
  const rightYear = viewMonths[1].year();

  // Filter bulan & tahun kanan sesuai aturan
  const monthsRight = months.filter((m) =>
    rightYear === leftYear ? Number(m.value) >= leftMonth : true
  );
  const yearsRight = years.filter((y) => Number(y.value) >= leftYear);

  // Handlers untuk dropdown month/year kiri dan kanan
  const onChangeMonthLeft = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthNumber = Number(e.target.value);
    setViewMonths((prev) => {
      let newRightMonth = prev[1].month() + 1;
      const newLeftYear = prev[0].year();

      if (newLeftYear === prev[1].year() && monthNumber > newRightMonth) {
        newRightMonth = monthNumber;
      }

      return [
        prev[0].month(monthNumber - 1),
        prev[1].month(newRightMonth - 1).year(prev[1].year()),
      ];
    });
  };

  const onChangeYearLeft = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearNumber = Number(e.target.value);
    setViewMonths((prev) => {
      let newRightYear = prev[1].year();
      let newRightMonth = prev[1].month() + 1;

      if (yearNumber > prev[1].year()) {
        newRightYear = yearNumber;
        newRightMonth = 1;
      }

      if (yearNumber === newRightYear && newRightMonth < prev[0].month() + 1) {
        newRightMonth = prev[0].month() + 1;
      }

      return [
        prev[0].year(yearNumber),
        prev[1].year(newRightYear).month(newRightMonth - 1),
      ];
    });
  };

  const onChangeMonthRight = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthNumber = Number(e.target.value);
    setViewMonths((prev) => {
      const leftYear = prev[0].year();
      const leftMonth = prev[0].month() + 1;
      const rightYear = prev[1].year();

      let newMonth = monthNumber;
      if (rightYear === leftYear && newMonth < leftMonth) {
        newMonth = leftMonth;
      }

      return [prev[0], prev[1].month(newMonth - 1)];
    });
  };

  const onChangeYearRight = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearNumber = Number(e.target.value);
    setViewMonths((prev) => {
      const leftYear = prev[0].year();

      const newYear = yearNumber < leftYear ? leftYear : yearNumber;
      let newMonth = prev[1].month() + 1;

      if (newYear === leftYear && newMonth < prev[0].month() + 1) {
        newMonth = prev[0].month() + 1;
      }

      return [prev[0], prev[1].year(newYear).month(newMonth - 1)];
    });
  };

  // Jika mode single, hanya render 1 bulan (index 0)
  const monthsToRender = isRange ? viewMonths : [viewMonths[0]];

  // Format tampilan nilai input
  const displayValue = () => {
    if (!internalValue) return "";
    if (isRange) {
      const [start, end] = (internalValue as [Dayjs | null, Dayjs | null]) || [
        null,
        null,
      ];
      return `${start ? start.format(format) : ""}${
        end ? ` - ${end.format(format)}` : ""
      }`;
    }
    return (internalValue as Dayjs).format(format);
  };

  return (
    <div ref={ref} className={clsx(className, "w-full relative")}>
      <Input
        readOnly
        value={displayValue()}
        placeholder={placeholder}
        onFocus={() => setShow(true)}
        suffix={<IoCalendarOutline className="h-5 w-5 text-base-300" />}
      />

      {show && (
        <div className="absolute z-50 mt-2 p-4 bg-base-100 border border-base-200 rounded shadow-lg w-max">
          <div className="flex gap-6">
            {monthsToRender.map((month, idx) => {
              const days = daysInMonthGrid(month);

              // Untuk mode range, destructure start/end, untuk single skip
              let start: Dayjs | null = null;
              let end: Dayjs | null = null;
              if (isRange) {
                const selectedRange = (internalValue as [
                  Dayjs | null,
                  Dayjs | null
                ]) || [null, null];
                [start, end] = selectedRange;
              }

              // Dropdown bulan & tahun untuk kiri (idx=0) dan kanan (idx=1)
              const isLeft = idx === 0;

              const monthOptions = isLeft ? months : monthsRight;
              const yearOptions = isLeft ? years : yearsRight;

              const onChangeMonthHandler = isLeft
                ? onChangeMonthLeft
                : onChangeMonthRight;
              const onChangeYearHandler = isLeft
                ? onChangeYearLeft
                : onChangeYearRight;

              return (
                <div key={idx} className="calendar-month min-w-[250px]">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <Select
                      size="sm"
                      variant="primary"
                      bordered
                      options={monthOptions}
                      value={String(month.month() + 1)}
                      onChange={onChangeMonthHandler}
                    />
                    <Select
                      size="sm"
                      variant="primary"
                      bordered
                      options={yearOptions}
                      value={String(month.year())}
                      onChange={onChangeYearHandler}
                    />
                  </div>

                  <div className="grid grid-cols-7 text-center text-xs mb-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="font-semibold">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 text-center gap-1">
                    {days.map((day, i) => {
                      const isCurrentMonth = day.isSame(month, "month");

                      let isSelected = false;
                      let isInRangeHover = false;

                      if (!isRange) {
                        isSelected = internalValue
                          ? day.isSame(internalValue as Dayjs, "day")
                          : false;
                      } else {
                        if (start && end) {
                          isSelected =
                            day.isSame(start, "day") ||
                            day.isSame(end, "day") ||
                            (day.isAfter(start, "day") &&
                              day.isBefore(end, "day"));
                        } else if (start && !end) {
                          isSelected = day.isSame(start, "day");
                          if (hoverDate) {
                            const rangeStart = start.isBefore(hoverDate)
                              ? start
                              : hoverDate;
                            const rangeEnd = start.isAfter(hoverDate)
                              ? start
                              : hoverDate;

                            isInRangeHover =
                              day.isAfter(rangeStart, "day") &&
                              day.isBefore(rangeEnd, "day");
                          }
                        }
                      }

                      return (
                        <Button
                          key={i}
                          size="sm"
                          variant={
                            isSelected || isInRangeHover ? "primary" : "default"
                          }
                          onClick={() => handleSelectDate(day)}
                          onMouseEnter={() => setHoverDate(day)}
                          onMouseLeave={() => setHoverDate(null)}
                          style={{ opacity: isCurrentMonth ? 1 : 0.5 }}
                          className="hover:btn-primary"
                        >
                          {day.date()}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex place-content-end pt-2">
            <Button
              size="sm"
              onClick={() => {
                setInternalValue(null);
                onChange?.(null);
                setShow(false);
              }}
              variant="error"
              className="text-white"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
