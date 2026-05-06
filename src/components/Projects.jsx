import React, { useState, useEffect } from 'react';
import {
  Container, Row, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const Projects = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const projectsToDisplay = data?.projects || [];
  const firstBatch = projectsToDisplay.slice(0, 3);
  const secondBatch = projectsToDisplay.slice(3, 6);
  const remaining = projectsToDisplay.slice(6);

  return (
    <>
      {data ? (
        <>
          <div data-scroll-section className="projects-intro-section d-flex align-items-center justify-content-center">
            <Container className="text-center">
              <Header title={header} />
              <div className="mt-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p className="fs-3 text-white-50" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
                  Crafting scalable digital solutions with a focus on
                  {' '}
                  <span style={{ color: '#f5c518', fontWeight: 600 }}>performance</span>
                  ,
                  {' '}
                  <span style={{ color: '#f5c518', fontWeight: 600 }}>usability</span>
                  , and
                  {' '}
                  <span style={{ color: '#f5c518', fontWeight: 600 }}>innovation</span>
                  .
                </p>
              </div>
              <div className="scroll-indicator mt-5 animate-bounce">
                <span className="text-white-50">Scroll to explore my work</span>
                <div style={{
                  width: '2px', height: '50px', background: 'linear-gradient(to bottom, #f5c518, transparent)', margin: '15px auto',
                }}
                />
              </div>
            </Container>
          </div>

          <div data-scroll-section className="projects-grid-section py-5 d-flex align-items-center">
            <Container>
              <Row xs={1} md={2} lg={3} className="g-5">
                {firstBatch.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </Row>
            </Container>
          </div>

          {secondBatch.length > 0 && (
            <div data-scroll-section className="projects-grid-section py-5 d-flex align-items-center">
              <Container>
                <Row xs={1} md={2} lg={3} className="g-5">
                  {secondBatch.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </Row>
              </Container>
            </div>
          )}

          {(remaining.length > 0 || !showMore) && (
            <div data-scroll-section className="projects-footer-section py-5 d-flex align-items-center justify-content-center">
              <Container className="text-center">
                {showMore ? (
                  <Row xs={1} md={2} lg={3} className="g-5 text-start">
                    {remaining.map((project) => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                  </Row>
                ) : (
                  <div className="py-5">
                    <h3 className="mb-4 text-white-50">Want to see more of my work?</h3>
                    <Button
                      size="lg"
                      variant="outline-warning"
                      style={{
                        padding: '15px 40px',
                        borderRadius: '30px',
                        fontSize: '1.2rem',
                        borderColor: '#f5c518',
                        color: '#f5c518',
                      }}
                      onClick={() => setShowMore(true)}
                    >
                      View All Projects
                    </Button>
                  </div>
                )}
              </Container>
            </div>
          )}
        </>
      ) : (
        <div data-scroll-section><FallbackSpinner /></div>
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
