import React from "react";
import PropTypes from "prop-types";
import { translationModule } from "kambi-widget-core-library";
import DateComponent from "./Date";

const t = translationModule.getTranslation.bind(translationModule);
import styles from "./Participants.scss";

const WORLD_CUP_2018_ID = 2000075007;

const Participants = ({ event, flagBaseUrl, iconUrl, onClick }) => {
  return (
    <div className={styles.participants} onClick={onClick}>
      <div className={styles.team}>
        <h2 className={styles.label}>{event.homeName}</h2>
      </div>
      <div className={styles.logo}>
        <h3 className={styles.label}>{t("championsLeague").toUpperCase()}</h3>
        <p className={styles.sublabel}>{t("leagueYear").toUpperCase()}</p>

        <DateComponent date={event.start} short={true} />
      </div>
      <div className={styles.team}>
        <h2 className={styles.label}>{event.awayName}</h2>
      </div>
    </div>
  );
};

Participants.propTypes = {
  event: PropTypes.object.isRequired,
  flagBaseUrl: PropTypes.string,
  iconUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Participants;
