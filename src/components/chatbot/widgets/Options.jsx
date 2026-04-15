import React from 'react';
import styles from '../Chatbot.module.css';

const Options = (props) => {
  const options = props.options || [];

  return (
    <div className={styles.optionsContainer}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => option.handler(props)}
          className={styles.optionButton}
        >
          {option.text}
          {option.info && (
            <span className={styles.optionInfo}>{option.info}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Options;
