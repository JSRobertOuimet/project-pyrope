import Moment from "moment";

export const completionPercentage = (sessions, pagesToRead) => {
  const pagesReadEntries = [0];
  let pagesReadTotal, completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);
  completionPercentage = Math.round((pagesReadTotal / pagesToRead) * 100);

  if(completionPercentage < 1) completionPercentage = 1;
  if(completionPercentage >= 100) completionPercentage = 100;

  return completionPercentage;
};

export const averagePagesReadPerDay = sessions => {
  const datesAndPagesRead = [];

  sessions.map(session => {
    return datesAndPagesRead.push({
      date: Moment(session.date).format("YYYY-MM-DD"),
      pagesRead: session.numberOfPagesRead
    });
  });

  return datesAndPagesRead;
};

export const authorsRead = challenges => {
  const allAuthors = [];
  
  challenges.map(challenge => allAuthors.push(challenge.book.author));

  return Array.from(new Set(allAuthors)).length;
};

export const challengesCompleted = challenges => challenges.filter(challenge => challenge.completed === true).length;