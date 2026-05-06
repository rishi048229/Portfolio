import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const Home = () => {
  const [data, setData] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (data && heroRef.current && window.gsap) {
      const tl = window.gsap.timeline({ delay: 0.5 });

      // staggered entry "one by one"
      tl.from('.hero-label', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from('.hero-name-part-1', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6')
        .from('.hero-name-part-2', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6')
        .from('.hero-subtitle', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6')
        .from('.hero-btns', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6');

      // Photo animation (separate)
      window.gsap.from('.hero-photo-wrapper', {
        opacity: 0,
        x: 50,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.8,
      });
    }
  }, [data]);

  if (!data) return <FallbackSpinner />;

  return (
    <section
      className="hero-section min-vh-100 d-flex flex-column justify-content-center pt-5"
      ref={heroRef}
      style={{ background: '#090909', overflow: 'hidden' }}
    >
      <Container>
        <Row className="align-items-center justify-content-between g-5">
          {/* Left Side: Content */}
          <Col lg={6} className="hero-content text-start pe-lg-5">
            <div
              className="hero-label mb-3"
              style={{
                color: '#888', letterSpacing: '4px', fontWeight: 'bold', fontSize: '1.2rem',
              }}
            >
              HELLO!
            </div>
            <h1 className="hero-name mb-3 fw-bold" style={{ lineHeight: '0.9' }}>
              <span className="text-white d-inline-block hero-name-part-1">I&apos;M&nbsp;</span>
              <br />
              <span style={{ color: '#f5c518' }} className="d-inline-block hero-name-part-2">{data.name}</span>
            </h1>
            <h2 className="hero-subtitle mb-5 fw-light">
              {data.roles && data.roles[0]}
            </h2>
            <div className="hero-btns d-flex gap-4">
              <Button
                style={{
                  backgroundColor: '#f5c518',
                  borderColor: '#f5c518',
                  color: '#090909',
                  padding: '15px 40px',
                  fontWeight: '800',
                  borderRadius: '0',
                  fontSize: '1.1rem',
                  letterSpacing: '1px',
                }}
              >
                HIRE ME
              </Button>
              <Button
                variant="outline-light"
                style={{
                  padding: '15px 40px',
                  fontWeight: '800',
                  borderRadius: '0',
                  fontSize: '1.1rem',
                  letterSpacing: '1px',
                }}
              >
                MY WORKS
              </Button>
            </div>
          </Col>

          {/* Right Side: Photo */}
          <Col lg={5} className="position-relative mt-5 mt-lg-0 d-flex justify-content-end">
            <div
              className="hero-photo-wrapper position-relative mt-5"
              style={{
                maxWidth: '500px',
                width: '100%',
                paddingTop: '60px',
                paddingBottom: '20px',
              }}
              data-scroll
            >
              {/* Halo Glow */}
              <div
                className="position-absolute top-50 start-50 translate-middle w-100 h-100"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 197, 24, 0.15) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                  zIndex: '0',
                }}
              />

              <img
                src="/images/WhatsApp_Image_2026-05-06_at_11.57.23_AM-removebg-preview.png"
                alt="Portrait"
                className="img-fluid position-relative"
                style={{
                  zIndex: '1',
                  filter: 'brightness(0.95) contrast(1.05)',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />

              {/* Vignette/Blending overlay */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: 'linear-gradient(to bottom, transparent 70%, #090909 100%)',
                  zIndex: '2',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
