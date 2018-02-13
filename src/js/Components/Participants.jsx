import React from 'react'
import PropTypes from 'prop-types'
import styles from './Participants.scss'

const Participants = ({ homeName, awayName, onClick }) => {
  return (
    <div className={styles.participants} onClick={onClick}>
      <span className={styles['participants-font-size']}> {homeName} </span>
      <span className={styles['participants-font-size']}> - </span>
      <span className={styles['participants-font-size']}> {awayName} </span>
    </div>
  )
}

Participants.propTypes = {
  homeName: PropTypes.string.isRequired,

  awayName: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
}

export default Participants
