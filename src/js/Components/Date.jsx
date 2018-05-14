import React from "react";
import PropTypes from "prop-types";
import { translationModule } from "kambi-widget-core-library";

const t = translationModule.getTranslation.bind(translationModule);

/**
 * Pads with leading 0s to ensure number is two digit.
 * @param {number} n Number to pad
 */
const pad = function(n) {
  return n < 10 ? '0' + n : n
}

/**
 * Returns 'today', 'tomorrow' or formatted date if after that
 * @param {string} startTime
 */
const eventTime = (startTime, short) => {
  const prefix = short ? 'Abbr' : ''
  const now = new Date(),
    date = new Date(startTime)

  const soonStr = (function() {
    if (now.getDate() === date.getDate()) {
      return t('today')
    } else if (now.getDate() === date.getDate() - 1) {
      return t('tomorrow')
    } else {
      return ''
    }
  })()

  if (soonStr.length > 0) {
    return `${soonStr} ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  return `${t(`day${date.getDay()}${prefix}`)} ${date.getDate()} ${t(
    `month${date.getMonth()}${prefix}`
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const DateComponent = ({ date, short = false }) => (
  <p>{eventTime(date, short)}</p>
)

DateComponent.propTypes = {
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  short: PropTypes.bool,
}

export default DateComponent;
