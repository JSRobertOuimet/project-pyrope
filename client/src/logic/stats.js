export const completionPercentage = (sessions, pagesToRead) => {
  const pagesReadEntries = [0];
  let pagesReadTotal, completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);
  completionPercentage = (pagesReadTotal / pagesToRead).toFixed(2) * 100;

  return completionPercentage >= 100 ? 100 : completionPercentage;
};