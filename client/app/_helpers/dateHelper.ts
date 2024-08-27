const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const generateDate = (date: Date) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `${day}-${month}-${year}`;
};
