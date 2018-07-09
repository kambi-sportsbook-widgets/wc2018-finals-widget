import React from 'react'
import PropTypes from 'prop-types'
import { BlendedBackground } from 'kambi-widget-components'
import EventWidget from './EventWidget'
import Carousel from './Carousel'

class MainComponent extends React.Component {
  render() {
    const Events = this.props.data
      .filter(event => event.betOffers.length > 1)
      .map(event => {
        return (
          <EventWidget
            key={event.event.id}
            event={event}
            flagBaseUrl={this.props.flagBaseUrl}
            iconUrl={this.props.iconUrl}
          />
        )
      })

    return (
      <div>
        {/*
         * @property backgroundUrl {String} provides path to backgroundImage
         * @property blendWithOperatorColor {Boolean} determines if background should be blended with operator color. (Normally not wanted if providing own background image)
        */}
        <BlendedBackground
          backgroundUrl={this.props.backgroundUrl}
          blendWithOperatorColor={
            this.props.backgroundUrl ===
            'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/overview-bw-bg-desktop.jpg'
          }
        />
        <Carousel slides={Events} />
      </div>
    )
  }
}

MainComponent.propTypes = {
  data: PropTypes.array.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  flagBaseUrl: PropTypes.string,
  iconUrl: PropTypes.string,
}

export default MainComponent
