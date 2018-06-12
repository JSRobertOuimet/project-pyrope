import Moment from "moment";

// Returns completion percentage for a specific challenge
export const completionPercentage = (sessions, pagesToRead) => {
  const pagesReadEntries = [0];
  let pagesReadTotal, completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);
  completionPercentage = Math.round((pagesReadTotal / pagesToRead) * 100);

  if(completionPercentage < 1) completionPercentage = 1;
  if(completionPercentage >= 100) {
    completionPercentage = 100;

    // Mark challenge as "completed": true
  }

  return completionPercentage;
};

// Returns average pages read per day (taking into account all challenges)
export const averagePagesReadPerDay = sessions => {
  const
    datesAndPagesRead = [],
    uniqueDates = [],
    pagesReadEntries = [0];
  let pagesReadTotal;

  sessions.map(session => {
    return datesAndPagesRead.push({
      date: Moment(session.date).format("YYYY-MM-DD"),
      pagesRead: session.numberOfPagesRead
    });
  });

  datesAndPagesRead.map(currentValue => {
    if(uniqueDates.indexOf(currentValue.date) === -1) {
      uniqueDates.push(currentValue.date);
    }

    return pagesReadEntries.push(currentValue.pagesRead);
  });

  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue);

  return pagesReadTotal / uniqueDates.length;
};

// Returns number of authors read (taking into account all challenges)
export const authorsRead = challenges => {
  const allAuthors = [];

  challenges.map(challenge => allAuthors.push(challenge.book.author));

  return Array.from(new Set(allAuthors)).length;
};

export const challengesCompleted = challenges => challenges.filter(challenge => challenge.completed === true).length;