"use strict";

const optionDate = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "short",
};

// function for formating date
// function for formating currency
const formatCurrency = function (value) {
  const optionCurr = {
    style: "currency",
    currency: currentAccount.currency,
  };

  return new Intl.NumberFormat(currentAccount.locale, optionCurr).format(value);
};

const formatDate = function (date, option) {
  // edit date
  const dateDifferent = (date1, date2) => {
    const result = Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    return result;
  };

  const Different = dateDifferent(new Date(), date);

  if (Different === 0) return `Today`;
  if (Different === 1) return `Yesterday`;
  if (Different <= 7) return `${Different} days ago`;

  return new Intl.DateTimeFormat(currentAccount.locale, option).format(date);
};
