import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Loader = ({ title, message }) => (
  <Container style={{ maxWidth: '800px' }}>
    <Message icon size="medium" style={{ margin: '1rem', padding: '1rem' }}>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>
          {title ? title : 'Just one second'}
        </Message.Header>
        <span style={{ fontSize: '1rem' }}>
          {message ? message : 'We are fetching that content for you.'}
        </span>
      </Message.Content>
    </Message>
  </Container>
);

export default Loader;
