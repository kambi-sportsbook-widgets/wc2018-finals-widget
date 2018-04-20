import React from 'react'
import PropTypes from 'prop-types'
import { widgetModule, translationModule } from 'kambi-widget-core-library'
import styles from './EventWidget.scss'
import Participants from './Participants'
import BetOffers from './BetOffers'

/**
 * Navigate to event
 * @param {Object} event
 */
const navigateToEvent = event => {
  if (event.event.openForLiveBetting === true) {
    // Navigate to live event
    // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-widgetModule.html#.navigateToLiveEvent__anchor
    widgetModule.navigateToLiveEvent(event.event.id)
  } else {
    // Navigate to prelive event
    // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-widgetModule.html#.navigateToEvent__anchor
    widgetModule.navigateToEvent(event.event.id)
  }
}

/**
 * Check if the event is live and return a label to be added to the title
 * @param event
 * @returns {String} Either the translated label or an empty string
 */
const liveLabel = event => {
  if (event.event.liveBetOffers) {
    // Translate a string
    // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-translationModule.html#.getTranslation__anchor
    return ' - ' + translationModule.getTranslation('liveRightNow')
  }
  return ''
}

class EventWidget extends React.Component {
  /**
   * Called after the component is mounted
   **/
  componentDidMount() {
    this.adaptWidgetHeight()
    window.addEventListener('resize', this.adaptWidgetHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.adaptWidgetHeight)
  }

  adaptWidgetHeight = () => {
    // Adjust widget height
    // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-widgetModule.html#.adaptWidgetHeight__anchor
    widgetModule.adaptWidgetHeight()
  }

  render() {
    let sliceIndex = this.props.event.betOffers.length > 2 ? 2 : 1
    const betOffersLeft = this.props.event.betOffers.slice(0, sliceIndex)
    const betOffersRight = this.props.event.betOffers.slice(sliceIndex)

    return (
      <div>
        <div className={styles.container}>
          <BetOffers betOffers={betOffersLeft} event={this.props.event.event} />
          <Participants
            event={this.props.event.event}
            flagBaseUrl={this.props.flagBaseUrl}
            iconUrl={this.props.iconUrl}
            onClick={navigateToEvent.bind(null, this.props.event)}
          />
          <BetOffers
            betOffers={betOffersRight}
            event={this.props.event.event}
          />
        </div>
      </div>
    )
  }
}

EventWidget.propTypes = {
  event: PropTypes.object.isRequired,
  flagBaseUrl: PropTypes.string,
  iconUrl: PropTypes.string,
}

export default EventWidget
