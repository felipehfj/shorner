import { Container } from '@material-ui/core';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Test from '../src/components/Shortner';

const Home: React.FC = () => {
  return (
    <Fragment>
      <Container>
        <Test />
        <div>
          <Link href="/login">Login</Link>
        </div>
      </Container>
    </Fragment>
  );
}

export default Home;
