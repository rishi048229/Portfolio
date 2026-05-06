import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';

const styles = {
  glassCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '25px',
    padding: '4rem',
    color: '#fff',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  label: {
    color: '#f5c518',
    fontFamily: 'Syne, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  value: {
    fontSize: '1.4rem',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  socialLink: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.1rem',
    opacity: 0.8,
  },
};

const Contact = (props) => {
  const { header } = props;

  return (
    <div data-scroll-section className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Container>
        <Header title={header} />
        <Fade bottom>
          <div className="d-flex justify-content-center mt-5">
            <Card style={styles.glassCard} className="text-start">
              <Card.Body>
                <Row className="g-5">
                  <Col md={6}>
                    <div className="mb-4">
                      <div style={styles.label}>Name</div>
                      <div style={styles.value}>Rishi Ashok Singh</div>
                    </div>
                    <div className="mb-4">
                      <div style={styles.label}>Qualification</div>
                      <div style={styles.value}>B.E Computer Science</div>
                    </div>
                    <div className="mb-4">
                      <div style={styles.label}>Email</div>
                      <div style={styles.value}>
                        <a href="mailto:rishisingh048229@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                          rishisingh048229@gmail.com
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <div style={styles.label}>Mobile / WhatsApp</div>
                      <div style={styles.value}>
                        <a href="https://wa.me/919322048229" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                          +91 9322048229
                        </a>
                      </div>
                    </div>
                    <div className="mb-5">
                      <div style={styles.label}>Digital Presence</div>
                      <div className="d-flex flex-column gap-3 mt-3">
                        <a
                          href="https://www.linkedin.com/in/rishi-singh-a7121533a/"
                          target="_blank"
                          rel="noreferrer"
                          style={styles.socialLink}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#f5c518'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                        >
                          LinkedIn Profile
                        </a>
                        <a
                          href="https://github.com/rishi048229"
                          target="_blank"
                          rel="noreferrer"
                          style={styles.socialLink}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#f5c518'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                        >
                          GitHub Repositories
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4 pt-4 border-top border-white-10 text-center text-white-50">
                  <p className="mb-0">Available for innovative projects and full-stack opportunities.</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
