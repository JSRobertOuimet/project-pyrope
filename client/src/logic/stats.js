import Moment from "moment";

let pagesReadTotal;

// Returns completion percentage for a specific challenge
export const completionPercentage = (challenge, sessions) => {
  const pagesReadEntries = [];
  let completionPercentage;

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  completionPercentage = Math.round(pagesReadTotal / challenge.book.numberOfPages * 100);

  if(completionPercentage > 0 && completionPercentage < 1) completionPercentage = 1;
  if(completionPercentage > 100) completionPercentage = 100;

  return completionPercentage;
};

// Returns average sessions per week (taking into account all challenges)
export const averageSessionsPerWeek = sessions => {
  const sessionsDates = [];
  let earliestDate, latestDate, sessionsPeriod;

  sessions.map(session => sessionsDates.push(Moment(session.date, "YYYY-MM-DD")));
  earliestDate = Moment.min(sessionsDates).format("YYYY-MM-DD");
  latestDate = Moment.max(sessionsDates).format("YYYY-MM-DD");
  sessionsPeriod = Moment(latestDate).diff(Moment(earliestDate), "weeks") + 1;

  return Number((sessionsDates.length / sessionsPeriod).toFixed(1)) || 0;
};

// Returns average pages read per session (taking into account all challenges)
export const averagePagesReadPerDay = sessions => {
  const pagesReadEntries = [];

  sessions.map(session => pagesReadEntries.push(session.numberOfPagesRead));
  pagesReadTotal = pagesReadEntries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return Math.round(pagesReadTotal / sessions.length) || 0;
};

// Returns number of authors read (taking into account all challenges)
export const authorsRead = challenges => {
  const allAuthors = [];

  challenges.map(challenge => allAuthors.push(challenge.book.author));

  return Array.from(new Set(allAuthors)).length;
};

// Returns number of challenges completed
export const challengesCompleted = challenges => challenges.filter(challenge => challenge.completed === true).length;