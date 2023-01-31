export function getDate(value, name) {
    
    const currentDate = new Date();
    if (name === "Weeks") {
      return (new Date(
        currentDate.getTime() + (value*1.5) * 7 * 24 * 60 * 60 * 1000
      ));
    }
    if (name === "Days") {
      return (new Date(
        currentDate.getTime() + (value*1.5) * 24 * 60 * 60 * 1000
      ));
    }
    if (name === "Hours") {
      return new Date(currentDate.getTime() + (value*1.5) * 60 * 60 * 1000);
    }
    if (name === "Minutes") {
      return new Date(currentDate.getTime() + (value*1.5) * 60 * 1000);
    }
}