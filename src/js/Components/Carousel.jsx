import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group'

import styles from './Carousel.scss'

const addClass = (node, classes) =>
  node && classes && classes.split(' ').forEach(c => addOneClass(node, c))
const removeClass = (node, classes) =>
  node && classes && classes.split(' ').forEach(c => removeOneClass(node, c))

export default class Carousel extends Component {
  static defaultProps = {}

  static propTypes = {
    slides: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      animationDirection: 'right',
    }
    this.blockInteraction = false
    this.animationSpeed = parseFloat(styles.animationspeed) * 1000
  }

  goToSlide(idx, animationDirection) {
    if (idx === this.state.activeIndex || this.blockInteraction) {
      return
    }
    this.blockInteraction = true
    this.setState({
      activeIndex: idx,
      animationDirection,
    })
    setTimeout(() => {
      this.blockInteraction = false
    }, this.animationSpeed + 100)
  }

  nextSlide = () => {
    const { activeIndex } = this.state
    const nextIndex =
      activeIndex === this.props.slides.length - 1 ? 0 : activeIndex + 1
    this.goToSlide(nextIndex, 'right')
  }

  previousSlide = () => {
    const { activeIndex } = this.state
    const nextIndex =
      activeIndex === 0 ? this.props.slides.length - 1 : activeIndex - 1
    this.goToSlide(nextIndex, 'left')
  }

  renderChevronLeft() {
    return (
      <div className={styles.chevronLeft} onClick={this.previousSlide}>
        <svg
          fill="#fff"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    )
  }

  renderChevronRight() {
    return (
      <div className={styles.chevronRight} onClick={this.nextSlide}>
        <svg
          fill="#fff"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    )
  }

  render() {
    const { activeIndex } = this.state
    const currentSlide = this.props.slides[activeIndex]
    const slides = this.props.slides.map((slide, index) => {
      const rightAnimation = this.state.animationDirection === 'right'
      const classes = {
        enter: rightAnimation ? styles.enterRight : styles.enterLeft,
        enterActive: rightAnimation
          ? styles.enterActiveRight
          : styles.enterActiveLeft,
        exit: rightAnimation ? styles.exitRight : styles.exitLeft,
        exitActive: rightAnimation
          ? styles.exitActiveRight
          : styles.exitActiveLeft,
      }
      return (
        <CSSTransition
          in={index === activeIndex}
          classNames={classes}
          timeout={this.animationSpeed}
          key={index}
          mountOnEnter={true}
          onExiting={node => {
            const rightAnimation = this.state.animationDirection === 'right'
            if (rightAnimation) {
              node.classList.remove(styles.exitLeft)
              node.classList.remove(styles.exitActiveLeft)
              node.classList.add(styles.exitRight)
              node.classList.add(styles.exitActiveRight)
            } else {
              node.classList.remove(styles.exitRight)
              node.classList.remove(styles.exitActiveRight)
              node.classList.add(styles.exitLeft)
              node.classList.add(styles.exitActiveLeft)
            }
          }}
        >
          <div className={styles.slideContainer}>{slide}</div>
        </CSSTransition>
      )
    })

    return (
      <div className={styles.container}>
        <div href={currentSlide.url} className={styles.slideWrapper}>
          <TransitionGroup>{slides[activeIndex]}</TransitionGroup>
        </div>
        {this.props.slides.length > 1 ? this.renderChevronLeft() : null}
        {this.props.slides.length > 1 ? this.renderChevronRight() : null}
      </div>
    )
  }
}
