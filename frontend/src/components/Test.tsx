import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Button, TextField } from '@material-ui/core';

import urlService from '../services/urlService';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    }
  })
);

export default function Test() {
  const classes = useStyles();
  const [urlToShort, setUrlToShort] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const hasUrl = (str: string): boolean => {
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);

    if (str)
      return regex.test(str);
    else return false;
  }


  const generateShortUrl = async (uri: string) => {
    if (hasUrl(uri)) {
      const { data } = await urlService.createUrl({ url: uri });
      const { url, shortId } = data;
      setShortUrl(`http://192.168.1.12:3333/${shortId}`);
    }
  }
  return (
    <Box color="primary">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Url" value={urlToShort}
          onChange={(e) => {
            const { value } = e.target;
            setUrlToShort(value)
          }
          }
        />
        <Button variant="outlined" type="button" onClick={() => generateShortUrl(urlToShort)}>Gerar</Button>

        {
          hasUrl(shortUrl) && <Link href={shortUrl}>{shortUrl}</Link>
        }

      </form>
    </Box>
  );
}