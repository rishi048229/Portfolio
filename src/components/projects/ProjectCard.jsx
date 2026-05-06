import React from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <Col>
      <Card
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          height: '100%',
        }}
        className="project-card-h"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
          e.currentTarget.style.border = '1px solid rgba(245, 197, 24, 0.4)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <Card.Img
            variant="top"
            src={project?.image}
            style={{
              height: '240px',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent, rgba(9,9,9,0.8))',
          }}
          />
        </div>

        <Card.Body className="p-4">
          <Card.Title
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Syne, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {project.title}
          </Card.Title>
          <Card.Text as="div" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <ReactMarkdown children={project.bodyText} />
          </Card.Text>
        </Card.Body>

        <Card.Body className="px-4 pb-4 pt-0 mt-auto">
          <div className="d-flex flex-wrap gap-2 mb-4">
            {project.tags && project.tags.map((tag) => (
              <Badge
                key={tag}
                style={{
                  background: 'rgba(245, 197, 24, 0.1)',
                  color: '#f5c518',
                  border: '1px solid rgba(245, 197, 24, 0.2)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="d-flex gap-3">
            {project?.links?.map((link) => (
              <Button
                key={link.href}
                variant="link"
                style={{
                  color: '#f5c518',
                  textDecoration: 'none',
                  padding: 0,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
                onClick={() => window.open(link.href, '_blank')}
              >
                {link.text}
                {' '}
                <span className="ms-1">→</span>
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
