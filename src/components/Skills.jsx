import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div data-scroll-section className="py-5">
      <Container>
        <Header title={header} />
        {data ? (
          <Fade>
            <div className="mt-4">
              {renderSkillsIntro(data.intro)}
              {data.skills?.map((rows) => (
                <div key={rows.title} className="mt-5">
                  <h3 style={{ color: '#f5c518', fontFamily: 'Syne, sans-serif', textTransform: 'uppercase' }}>{rows.title}</h3>
                  <div className="d-flex flex-wrap gap-4 mt-4">
                    {rows.items.map((item) => (
                      <div key={item.title} className="text-center" style={{ width: '120px' }}>
                        <img
                          style={styles.iconStyle}
                          src={item.icon}
                          alt={item.title}
                        />
                        <p className="mt-2 text-white-50 fw-bold" style={{ fontSize: '0.9rem' }}>{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        ) : <FallbackSpinner />}
      </Container>
    </div>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
