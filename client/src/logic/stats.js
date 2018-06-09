export const completionPercentage = (sessions, pagesToRead) => {
  const pagesReadEntries = [0];
  let pagesReadTotal, completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);
  completionPercentage = Math.round((pagesReadTotal / pagesToRead) * 100);

  return completionPercentage >= 100 ? 100 : completionPercentage;
};

export const authorsRead = challenges => {
  const allAuthors = [];
  
  challenges.map(challenge => allAuthors.push(challenge.book.author));

  return Array.from(new Set(allAuthors)).length;
};

export const challengesCompleted = challenges => challenges.filter(challenge => challenge.completed === true).length;