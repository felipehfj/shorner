import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import urlService from '../services/urlService';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
    btnAction: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%',
      verticalAlign: 'bottom'
    },
    boxUrl: {
      width: '100%',
      minHeight: 50,
    }
  })
);

export default function Test() {
  const classes = useStyles();
  const [generatedShortId, setGeneratedShortId] = useState<string>("");
  const [urlToShort, setUrlToShort] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [protocol, setProtocol] = React.useState('https://');
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProtocol(event.target.value as string);
  };

  const hasUrl = (str: string): boolean => {
    var expression = /^((http[s]?|ftp):\/)\/?([^:\/\s]+)(?::([0-9]+))?((\/\w+)*\/)?([\w\-\.]*[^#?\s]+)?(.*)?(#[\w\-]+)?$/gi;
    var regex = new RegExp(expression);

    if (str)
      return regex.test(str);
    else return false;
  }

  const redirect = async () => {
    let { data } = await urlService.redirect(generatedShortId);
    console.log(data)
    window.open(data)
    }


  const generateShortUrl = async (uri: string) => {
    setShortUrl('');
    setErrorMsg('');

    if (hasUrl(uri)) {
      try {
        const { data } = await urlService.createUrl({ url: uri });
        const { url, shortId } = data;
        setGeneratedShortId(shortId);
        setShortUrl(`${NEXT_PUBLIC_API_URL}/${shortId}`);
        setErrorMsg('');
      } catch (error) {
        setGeneratedShortId('');
        console.log(error);
        setErrorMsg(error.response.data.msg ?? error.message);
      }
    }
  }
  return (
    <Box >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Select
            className={classes.formControl}
            id="demo-simple-select"
            label="Protocolo"
            value={protocol}
            onChange={handleChange}
          >
            <MenuItem value={"https://"} selected>https://</MenuItem>
            <MenuItem value={'http://'}>http://</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.formControl}
            fullWidth
            autoComplete={'off'}
            id="standard-basic"
            placeholder="url"
            value={urlToShort}
            onChange={(e) => {
              const { value } = e.target;
              setUrlToShort(value)
            }
            }
          />
        </Grid>
      </Grid>
      <Button className={classes.btnAction} size={'medium'} variant="outlined" type="button" color="primary" onClick={() => generateShortUrl(protocol + urlToShort)}>Encurtar</Button>

      {
        (shortUrl || errorMsg) && <Box width={1}>
          <Paper elevation={3} className={classes.boxUrl}>
            {
              hasUrl(shortUrl) && <><Link href={shortUrl}><a target={'_blank'} rel="noopener">{shortUrl}</a></Link><Button onClick={() => redirect()} >Visitar</Button></>
            }
            {
              errorMsg && <Alert severity="error">{errorMsg}</Alert>
            }
          </Paper>
        </Box>
      }

    </Box >
  );
}