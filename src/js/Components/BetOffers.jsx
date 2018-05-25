import React from 'react'
import PropTypes from 'prop-types'
import { OutcomeButton } from 'kambi-widget-components'
import styles from './BetOffers.scss'

const BetOffers = ({ event, betOffers, isMobile }) => {
  return (
    <div
      className={`${styles.betofferContainer} ${
        isMobile ? styles.betofferContainerMobile : ''
      }`}
    >
      {betOffers.map(betOffer => {
        if (betOffer.outcomes && betOffer.outcomes.length) {
          const mainClass = betOffer.main ? ' main' : ''
          return (
            <div
              className={`${styles.event} ${mainClass} ${
                isMobile ? styles.eventMobile : ''
              }`}
              key={betOffer.id}
            >
              <span className={styles.betofferLabel}>
                {betOffer.criterion.label}
              </span>
              <div className={styles.outcomes}>
                {betOffer.outcomes.map(outcome => (
                  <div className={styles.outcome} key={outcome.id}>
                    {/* Outcome button component
                                  https://github.com/kambi-sportsbook-widgets/widget-components/blob/master/README.md
                                 */}
                    <OutcomeButton
                      outcome={outcome}
                      outlineStyle={true}
                      event={event}
                      updateOdds={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

BetOffers.propTypes = {
  betOffers: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
}

export default BetOffers
