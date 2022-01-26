"use strict";

module.exports = (text='', color='White') => {
  return `@powershell write-host -fore ${color} ${text}`;
}