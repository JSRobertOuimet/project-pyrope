export const completionPercentage = (sessions, pagesToRead) => {
  const pagesReadEntries = [];
  let pagesReadTotal, completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);
  completionPercentage = (pagesReadTotal / pagesToRead).toFixed(2) * 100;

  return completionPercentage;
};