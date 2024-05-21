import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MediaGrid from '../components/media-grid';

const MediaPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Media</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <MediaGrid section="What we have built" />
        </Col>
        <Col>
          <MediaGrid section="Publications" />
        </Col>
        <Col>
          <MediaGrid section="Podcasts" />
        </Col>
        <Col>
          <MediaGrid section="Courses" />
        </Col>
      </Row>
    </Container>
  );
};

export default MediaPage;
