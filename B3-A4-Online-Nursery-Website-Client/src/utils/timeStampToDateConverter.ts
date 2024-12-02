const timeStampToDateConverter = (
  timestamp: number,
  isMilliseconds: boolean = true
): string => {
  // If the timestamp is in seconds, convert it to milliseconds
  const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);

  // Format the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default timeStampToDateConverter;
