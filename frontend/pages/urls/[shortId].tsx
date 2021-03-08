import React, { Fragment } from 'react';
import { Button, Container } from '@material-ui/core';
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import urlService from '../../src/services/urlService';
import UrlDataUnit from '../../src/components/UrlDataUnit';


export default function ShortIdData({ url, notFound }) {
  const router = useRouter();

  if (!router.isFallback && notFound) {
    return <ErrorPage statusCode={404} title={'Página não encontrada'} />
  }

  return (
    <Fragment>
      <Container>
        <Button onClick={() => router.back()} >Voltar</Button>
        <UrlDataUnit url={url} />
      </Container>
    </Fragment>
  );
}


type Params = {
  params: {
    shortId: string
  }
}


export async function getStaticProps({ params }: Params) {
  const { data } = await urlService.getOne(params.shortId);
  const url = data;
  return {
    props: {
      url: {
        ...url,
      },
    },
    revalidate: 1    
  }
}

export async function getStaticPaths() {
  const { data } = await urlService.index();
  const urls = data;

  return {
    paths: urls.map((urls) => {
      return {
        params: {
          shortId: urls.shortId,
        },
      }
    }),
    fallback: false,
  }
}

// export async function getServerSideProps({ params }: Params) {
//   const { data } = await urlService.getOne(params.shortId);

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   const url = data;

//   return {
//     props: {
//       url: {
//         ...url,
//       },
//     },
//   }
// }
