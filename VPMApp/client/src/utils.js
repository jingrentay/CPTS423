export function getDate(value, name) {
    
    const currentDate = new Date();
    if (name === "Weeks") {
      return (new Date(
        currentDate.getTime() + (value * 1.5) * 7.0 * 24.0 * 60.0 * 60.0 * 1000.0
      ));
    }
    if (name === "Days") {
      return (new Date(
        currentDate.getTime() + (value * 1.5) * 24.0 * 60.0 * 60.0 * 1000.0
      ));
    }
    if (name === "Hours") {
      return new Date(currentDate.getTime() + (value * 1.5) * 60.0 * 60.0 * 1000.0);
    }
    if (name === "Minutes") {
      return new Date(currentDate.getTime() + (value * 1.5) * 60.0 * 1000.0);
    }
}