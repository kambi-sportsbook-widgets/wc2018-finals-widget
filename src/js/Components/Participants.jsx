import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'
import DateComponent from './Date'

const t = translationModule.getTranslation.bind(translationModule)
import styles from './Participants.scss'

const Participants = ({ event, flagBaseUrl, iconUrl, onClick }) => {
  // Generates country icon url
  function generateCountryFlagUrl(country) {
    const normalisedCountryName = country.toLowerCase().replace(/\s/g, '_')
    return flagBaseUrl? `${flagBaseUrl}/${normalisedCountryName}.svg`: ''
  }

  const homeFlagIcon = flagBaseUrl?
    <i
      className="kw-custom-logo-large-type"
      style={{
        backgroundImage: `url("${generateCountryFlagUrl(event.countriesEnglishNames[0])}")`,
      }}
    />: <i></i>
  const awayFlagIcon = flagBaseUrl?
    <i
      className="kw-custom-logo-large-type"
      style={{
        backgroundImage: `url("${generateCountryFlagUrl(event.countriesEnglishNames[1])}")`,
      }}
    />: <i></i>
  const logoIcon = iconUrl?
  <i
    className="kw-custom-logo-large-type"
    style={{
      backgroundImage: `url("${iconUrl}")`,
    }}
  />: <i></i>

  return (
    <div className={styles.participants} onClick={onClick}>
      <div className={styles.team}>
        {homeFlagIcon}
        <h2 className={styles.label}>{event.homeName}</h2>
      </div>
      <div className={styles.logo}>
        {logoIcon}
        <h3 className={styles.label}>{t('wc2018').toUpperCase()}</h3>
        <p className={styles.sublabel}>{t('russia').toUpperCase()}</p>

        <DateComponent date={event.start} short={true} />
      </div>
      <div className={styles.team}>
        {awayFlagIcon}
        <h2 className={styles.label}>{event.awayName}</h2>
      </div>
    </div>
  )
}

Participants.propTypes = {
  event: PropTypes.object.isRequired,
  flagBaseUrl: PropTypes.string,
  iconUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Participants
