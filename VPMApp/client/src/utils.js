export function getDate(value, name) {
    const currentDate = new Date();
    let newDate = "";
    if (name == "Weeks") {
      return (newDate = new Date(
        currentDate.getTime() + value * 7 * 24 * 60 * 60 * 1000
      ));
    }
    if (name == "Days") {
      return (newDate = new Date(
        currentDate.getTime() + value * 24 * 60 * 60 * 1000
      ));
    }
    if (name == "Hours") {
      return new Date(currentDate.getTime() + value * 60 * 60 * 1000);
    }
    if (name == "Minutes") {
      return new Date(currentDate.getTime() + value * 60 * 1000);
    }
}