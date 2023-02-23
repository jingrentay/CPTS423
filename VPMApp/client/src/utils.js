export function getDate(date, value, name, isBuffer) {
    
    const currentDate = date;
    if (name === "Weeks") {
      return (new Date(
        currentDate.getTime() + ( value * 1.5 ) * 7.0 * 24.0 * 60.0 * 60.0 * 1000.0
      ));
    }
    if (name === "Days") {
      return (new Date(
        currentDate.getTime() + ( value * 1.5 ) * 24.0 * 60.0 * 60.0 * 1000.0
      ));
    }
    if (name === "Hours") {
      return new Date(currentDate.getTime() + ( value * 1.5 ) * 60.0 * 60.0 * 1000.0);
    }
    if (name === "Minutes") {
      return new Date(currentDate.getTime() + ( value * 1.5 ) * 60.0 * 1000.0);
    }
}

export function getTimeDiff(startDate, duration, unit){
  const endTime = getDate(new Date(startDate), duration, unit, false)
  const startTime = new Date(startDate)
  return endTime-startTime
}