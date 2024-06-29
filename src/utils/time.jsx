export const formatTime = (time) => {
  const date = new Date(`1970-01-01T${time}Z`);
  // Apply UTC+7 offset
  date.setHours(date.getHours() - 7);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
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
