import React from 'react';
import styles from '../styles/SmartSyndication.module.css';

const FeatureCards = () => {
  const features = [
    {
      title: 'Campaigns+',
      description: 'Enhance your marketing reach',
      icon: '📈'
    },
    {
      title: 'Smart Syndication',
      description: 'Intelligent content distribution',
      icon: '🔄'
    },
    {
      title: 'Intent Targeting',
      description: 'Precise audience targeting',
      icon: '🎯'
    },
    {
      title: 'Event-Based Lead Generation',
      description: 'Convert events into opportunities',
      icon: '✨'
    }
  ];

  return (
    <div className={styles.featureCards}>
      {features.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <span className={styles.featureIcon}>{feature.icon}</span>
          <div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;