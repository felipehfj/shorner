import React, { Fragment } from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import UrlDataListUnit from '../src/components/UrlDataListUnit';
import urlService from '../src/services/urlService';


type ShortIdListProps = {
  urls: Array<UrlModel>,
  notFound: boolean
}


export default function ShortIdList({ urls, notFound }: ShortIdListProps) {
  const router = useRouter();

  if (!router.isFallback && notFound) {
    return <ErrorPage statusCode={404} title={'Página não encontrada'} />
  }

  return (
    <Fragment>
      <Container>
        <Button onClick={() => router.push('/')} >Home</Button>

        <Grid container spacing={1}>
          {
            urls.map(url => {
              return (
                <Grid item md={4} key={url.shortId}>
                  <UrlDataListUnit url={url} />
                </Grid>
              )
            })
          }
        </Grid>=
      </Container>
    </Fragment>
  );
}

export async function getServerSideProps() {
  const { data } = await urlService.index();

  if (!data) {
    return {
      notFound: true,
    }
  }

  const urls: Array<UrlModel> = data;

  return {
    props: {
      urls: urls,
    },
  }
}
