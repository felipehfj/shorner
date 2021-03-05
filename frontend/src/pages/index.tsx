import { Container } from '@material-ui/core';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Test from '../components/Test';

const Home: React.FC = () => {
  return (
    <Fragment>
      <Container>
        <Test />
        <div>
          <Link href="/login">Teste</Link>
        </div>
      </Container>
    </Fragment>
  );
}

export default Home;
