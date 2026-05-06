import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container, Col, Row, Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      {data ? (
        <>
          {/* Section 1: Bio & Portrait */}
          <div data-scroll-section id="about-intro" className="d-flex align-items-center justify-content-center">
            <Container>
              <Header title={header} />
              <Row className="align-items-center mt-3">
                <Col lg={7} className="text-start pe-lg-5">
                  <div style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
                    <ReactMarkdown children={data.intro} />
                  </div>
                </Col>
                <Col lg={4} className="mt-5 mt-lg-0 offset-lg-1">
                  <div
                    className="about-image-wrapper p-3"
                    style={{
                      border: '1px solid rgba(245, 197, 24, 0.3)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.02)',
                      maxWidth: '380px',
                      margin: '0 auto',
                    }}
                  >
                    <img
                      src={data?.imageSource}
                      alt="profile"
                      className="img-fluid"
                      style={{ borderRadius: '15px', filter: 'grayscale(20%) contrast(1.1)' }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Section 2: Core Values / Feature Cards */}
          <div data-scroll-section id="about-cards" className="d-flex align-items-center justify-content-center" style={{ paddingBottom: '40px' }}>
            <Container>
              <div className="text-center mb-4">
                <h2 style={{
                  fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', fontSize: '3rem', color: '#fff',
                }}
                >
                  Core
                  {' '}
                  <span style={{ color: '#f5c518' }}>Philosophy</span>
                </h2>
                <div style={{
                  width: '80px', height: '4px', background: '#f5c518', margin: '20px auto',
                }}
                />
              </div>
              <Row className="g-4">
                {data.cards && data.cards.map((card) => (
                  <Col md={6} lg={3} key={card.title}>
                    <Card
                      className="h-100 border-0"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '20px',
                        padding: '30px 20px',
                        transition: 'transform 0.3s, background 0.3s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.background = 'rgba(245, 197, 24, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                    >
                      <Card.Body className="text-center p-0">
                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{card.icon}</div>
                        <Card.Title
                          className="fw-bold mb-3"
                          style={{ color: '#f5c518', fontFamily: 'Syne, sans-serif', textTransform: 'uppercase' }}
                        >
                          {card.title}
                        </Card.Title>
                        <Card.Text className="text-white-50" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {card.text}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <div data-scroll-section><FallbackSpinner /></div>
      )}
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
