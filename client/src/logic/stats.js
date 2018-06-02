export const completionPercentage = (sessions, pagesToRead) => {
  const pagesRead = [0];
  const reducer = (total, currentValue) => total + currentValue;

  sessions.map(session => {
    pagesRead.push(session.numberOfPagesRead);
  });

  return (pagesRead.reduce(reducer) / pagesToRead).toFixed(2) * 100;
};