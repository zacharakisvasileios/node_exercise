export const padTwoDigits = (num) => {
  return num.toString().padStart(2, "0");
};

export const dateInYyyyMmDdHhMmSs = (date) => {
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
};
