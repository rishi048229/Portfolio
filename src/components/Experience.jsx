import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.experiences);
        setSummary(res.summary);
      })
      .catch((err) => err);
  }, []);

  return (
    <div data-scroll-section className="experience-page d-flex align-items-center justify-content-center">
      <Header title={header} />

      {data ? (
        <div className="section-content-container py-5">
          <Container>
            {summary && (
              <div className="experience-summary mb-5 text-center mx-auto" style={{ maxWidth: '800px' }}>
                <ReactMarkdown
                  children={summary}
                  className="fs-4 fw-light text-white-50"
                  style={{ lineHeight: '1.6' }}
                />
              </div>
            )}
            <Timeline lineColor={theme.timelineLineColor}>
              {data.map((item) => (
                <TimelineItem
                  key={item.title + item.dateText}
                  dateText={item.dateText}
                  dateInnerStyle={{ background: theme.accentColor, color: '#090909', fontWeight: 'bold' }}
                  style={styles.itemStyle}
                  bodyContainerStyle={{
                    color: theme.color,
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                >
                  <h2 className="item-title" style={{ color: '#fff', fontFamily: 'Syne, sans-serif' }}>
                    {item.title}
                  </h2>
                  <div style={styles.subtitleContainerStyle}>
                    <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                      {item.subtitle}
                    </h4>
                    {item.workType && (
                      <h5 style={styles.inlineChild} className="text-white-50 ms-2">
                        &nbsp;·
                        {' '}
                        {item.workType}
                      </h5>
                    )}
                  </div>
                  <ul style={styles.ulStyle}>
                    {item.workDescription.map((point) => (
                      <li key={point} className="mb-3 text-white-50" style={{ fontSize: '1.1rem' }}>
                        <ReactMarkdown
                          children={point}
                          components={{
                            p: 'span',
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </TimelineItem>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
