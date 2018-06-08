export const completionPercentage = (sessions, pagesToRead) => {
  const pagesReadEntries = [0];
  let pagesReadTotal, completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);
  completionPercentage = Math.round((pagesReadTotal / pagesToRead) * 100);

  return completionPercentage >= 100 ? 100 : completionPercentage;
};

export const challengesCompleted = challenges => {
  let completed = [];

  challenges.forEach(challenge => {
    if(challenge.completed === true) {
      completed.push(challenge);
    }
  });

  return completed.length;
};