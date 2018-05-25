import React from 'react'
import PropTypes from 'prop-types'
import {
  widgetModule,
  translationModule,
  coreLibrary,
} from 'kambi-widget-core-library'
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

const BREAKPOINT = 900 // higher than 768 intentionally

class EventWidget extends React.Component {
  constructor() {
    super()
    this.state = {
      isMobile:
        coreLibrary.rootElement.getBoundingClientRect().width < BREAKPOINT,
    }
  }
  /**
   * Called after the component is mounted
   **/
  componentDidMount() {
    this.adaptWidgetSize()
    window.addEventListener('resize', this.adaptWidgetSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.adaptWidgetSize)
  }

  adaptWidgetSize = () => {
    // Adjust widget height
    // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-widgetModule.html#.adaptWidgetHeight__anchor
    widgetModule.adaptWidgetHeight()
    this.setState({
      isMobile:
        coreLibrary.rootElement.getBoundingClientRect().width < BREAKPOINT,
    })
  }

  render() {
    const { event } = this.props

    return (
      <div>
        <div
          className={`${styles.container} ${
            this.state.isMobile ? styles.containerMobile : ''
          }`}
        >
          <BetOffers
            betOffers={
              event.bottomLeftBetOffer
                ? [event.topLeftBetOffer, event.bottomLeftBetOffer]
                : [event.topLeftBetOffer]
            } // for pre final testing purposes, the bottomLeftBO is not mandatory
            event={event.event}
            isMobile={this.state.isMobile}
          />
          <Participants
            event={event.event}
            flagBaseUrl={this.props.flagBaseUrl}
            iconUrl={this.props.iconUrl}
            onClick={navigateToEvent.bind(null, this.props.event)}
            isMobile={this.state.isMobile}
          />
          {!this.state.isMobile && (
            <BetOffers
              betOffers={[event.topRightBetOffer, event.bottomRightBetOffer]}
              event={event.event}
              isMobile={this.state.isMobile}
            />
          )}
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
