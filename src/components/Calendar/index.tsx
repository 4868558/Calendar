import React from "react";
import moment from "moment";
import { DateTime } from "luxon";

export default function Calendar({ users }) {
  console.log(users);

  let currentMonth = Number(moment().format("M"));
  let currentYear = Number(moment().format("YYYY"));

  function printCalendar(month, year) {
    const calendarDays = [];

    const startMonth = moment(`${month}-${year}`, "MM-YYYY").startOf("month");
    const endMonth = moment(`${month}-${year}`, "MM-YYYY").endOf("month");

    let tempDay = startMonth.clone().startOf("isoWeek");
    while (tempDay < endMonth.clone().endOf("isoWeek")) {
      const usersList = [];
      users.map((user) => {
        const tempDate = `${tempDay.format("D")}-${tempDay.format(
          "M"
        )}-${tempDay.format("YYYY")}`;
        const userTemp = moment(user.events[0].from, "DD-MM-YYYY");
        const userTempDate = `${userTemp.format("D")}-${userTemp.format(
          "M"
        )}-${userTemp.format("YYYY")}`;

        if (tempDate === userTempDate) {
          usersList.push(user.user);
          tempDay["events"] = usersList;
        }
      });

      tempDay["currentMonth"] =
        month === Number(tempDay.format("M")) ? true : false;

      // console.log(tempDay);
      calendarDays.push(tempDay);
      tempDay = tempDay.clone().add(1, "days");
    }

    return calendarDays;
  }

  return (
    <>
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
        {printCalendar(currentMonth, currentYear).map((day) => {
          return (
            <div
              key={day.format("DD-MM-YYYY")}
              data-date={day.format("DD-MM-YYYY")}
              className={day.currentMonth ? "current" : "notCurrent"}
            >
              {day.format("D")}
              {day?.events?.map((user) => {
                return <p>{user}</p>;
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}
