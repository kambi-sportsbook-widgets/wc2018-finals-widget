import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'

const t = translationModule.getTranslation.bind(translationModule)

const DateComponent = ({ date, short = false }) => {

  const dateObj = new Date(date)
  const prefix = short? 'Short': ''

  return (
    <p>
      { t('day' + prefix + dateObj.getDay()) + ' ' }
      { dateObj.getDate() + ' ' }
      { t('month' + prefix + dateObj.getMonth()) + ' ' }
      { dateObj.getHours() }:
      { dateObj.getMinutes() === 0? '00': dateObj.getMinutes() }
    </p>
  )
}

DateComponent.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]).isRequired,
  short: PropTypes.bool
}

export default DateComponent
