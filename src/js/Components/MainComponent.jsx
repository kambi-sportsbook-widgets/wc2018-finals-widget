import React from 'react'
import PropTypes from 'prop-types'
import { BlendedBackground, Carousel } from 'kambi-widget-components'
import EventWidget from './EventWidget'

class MainComponent extends React.Component {

  render() {
    const Events = this.props.data.map(event => {
      return (
        <EventWidget
          key={event.event.id}
          event={event}
          flagBaseUrl={this.props.flagBaseUrl}
          iconUrl={this.props.iconUrl}
        />
      )
    })

    return(
      <div>
        {/*
         * @property backgroundUrl {String} provides path to backgroundImage
         * @property blendWithOperatorColor {Boolean} determines if background should be blended with operator color. (Normally not wanted if providing own background image)
        */}
        <BlendedBackground
          backgroundUrl={this.props.backgroundUrl}
          blendWithOperatorColor={this.props.blendWithOperatorColor}
        />
        {Events}
      </div>
    )
  }
}

MainComponent.propTypes = {
  data: PropTypes.array.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  blendWithOperatorColor: PropTypes.bool.isRequired,
  flagBaseUrl: PropTypes.string,
  iconUrl: PropTypes.string,
}

export default MainComponent
