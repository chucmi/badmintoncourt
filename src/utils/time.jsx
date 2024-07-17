export const formatTime = (time) => {
  const date = new Date(`1970-01-01T${time}Z`);
  // Apply UTC+7 offset
  date.setHours(date.getHours() - 7);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatTimeV2 = (time) => {
  const date = new Date(`1970-01-01T${time}Z`);
  // Apply UTC+7 offset
  date.setHours(date.getHours() - 7);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const formatDate = (date) => {
  try {
    const isoDate = new Date(date).toISOString();
    return isoDate.split("T")[0]; // Extract YYYY-MM-DD part
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // or handle the error in an appropriate way
  }
};

export function formatDateTime(dateString) {
  const date = new Date(dateString);

  // Calculate the offset for UTC+7 from US-West (PST/PDT)
  const isDaylightSavingTime = date.getTimezoneOffset() < 0; // Check if the current date is in daylight saving time
  const offsetPSTtoUTC7 = 15 * 60 * 60 * 1000; // PST to UTC+7 offset in milliseconds
  const offsetPDTtoUTC7 = 14 * 60 * 60 * 1000; // PDT to UTC+7 offset in milliseconds
  const offset = isDaylightSavingTime ? offsetPDTtoUTC7 : offsetPSTtoUTC7;

  // Convert date to UTC+7
  const utc7Date = new Date(date.getTime() + offset);

  // Extract date and time components
  const year = utc7Date.getUTCFullYear();
  const month = String(utc7Date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(utc7Date.getUTCDate()).padStart(2, "0");
  const hours = String(utc7Date.getUTCHours()).padStart(2, "0");
  const minutes = String(utc7Date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(utc7Date.getUTCSeconds()).padStart(2, "0");

  // Return the formatted string
  return `${year}-${month}-${day} lúc ${hours}:${minutes}:${seconds}`;
}

export const calculateTimeRemaining = (bookingAtTime) => {
  // Convert bookingAtTime to a Date object in US-West timezone
  const bookingTime = new Date(bookingAtTime);
  const timeZone = "America/Los_Angeles";

  // Adjust bookingTime to UTC to ensure consistent calculation
  const bookingTimeUTC = new Date(
    bookingTime.toLocaleString("en-US", { timeZone: "UTC" })
  );

  // Calculate 5 minutes later time
  const fiveMinutesLater = new Date(bookingTimeUTC.getTime() + 5 * 60 * 1000);

  // Get current time in US-West timezone
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timeZone,
  });
  const currentTimeMillis = new Date(currentTime).getTime();

  // Calculate time difference in milliseconds
  let timeDiff = fiveMinutesLater - currentTimeMillis;

  // Ensure timeDiff is positive
  timeDiff = Math.max(timeDiff, 0);

  // Calculate minutes and seconds
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  // Format the result as mm:ss
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
