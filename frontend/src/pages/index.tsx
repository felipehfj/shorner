import { Container } from '@material-ui/core';
import React, { Fragment } from 'react';
import Test from '../components/Test';

const Home: React.FC = () => {
  return (
    <Fragment>
      <Container>
        <Test />
      </Container>
    </Fragment>
  );
}

export default Home;
