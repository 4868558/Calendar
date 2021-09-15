import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function Calendar({ users }) {
  const now = DateTime.now();
  let currentMonth = Number(now.toObject().month);
  let currentYear = Number(now.toObject().year);

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  function updateMonth() {
    return DateTime.fromFormat(
      `${(month < 10 ? "0" : "") + month}-01-${year}`,
      "MM-dd-yyyy"
    ).monthLong;
  }

  const [monthLabel, setMonthLabel] = useState(updateMonth());
  const [calendar, setCalendar] = useState([]);

  function printCalendar(monthNumber, yearNumber) {
    const calendarDays = [];

    const startMonth = DateTime.fromFormat(
      `${(monthNumber < 10 ? "0" : "") + monthNumber}-01-${yearNumber}`,
      "MM-dd-yyyy"
    );
    const endMonth = startMonth.endOf("month");

    let startCalendar = startMonth.startOf("week");
    const endCalendar = endMonth.endOf("week");
    while (startCalendar < endCalendar) {
      const usersList = [];
      users.map((user) => {
        let eventStart = DateTime.fromFormat(user.events[0].from, "dd-MM-yyyy");
        const eventEnd = DateTime.fromFormat(user.events[0].to, "dd-MM-yyyy");

        while (eventStart <= eventEnd) {
          if (
            startCalendar.toObject().day === eventStart.toObject().day &&
            startCalendar.toObject().month === eventStart.toObject().month &&
            startCalendar.toObject().year === eventStart.toObject().year
          ) {
            usersList.push(user.user);
          }
          eventStart = eventStart.plus({ days: 1 });
        }

        startCalendar["userEvents"] = usersList;
        console.log(usersList);
      });

      startCalendar["currentMonth"] =
        startCalendar.toObject().month === monthNumber ? true : false;

      calendarDays.push(startCalendar);
      startCalendar = startCalendar.plus({ days: 1 });
    }

    return calendarDays;
  }

  useEffect(() => {
    setCalendar(printCalendar(month, year));
    setMonthLabel(updateMonth());
  }, [month, year]);

  return (
    <>
      <div>
        <button onClick={() => setMonth(month - 1)}>Month decrease</button>
        <button onClick={() => setMonth(month + 1)}>Month increase</button>
        <h1>{monthLabel}</h1>
      </div>
      <section className="daysOfWeek">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </section>
      <section className="days">
        {calendar.map((day) => {
          return (
            <div
              key={day.toFormat("MM-dd-yyyy")}
              data-date={day.toFormat("MM-dd-yyyy")}
              className={day.currentMonth ? "current" : "notCurrent"}
            >
              {day.toObject().day}
              {day?.userEvents?.map((user) => {
                return <p>{user}</p>;
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}
