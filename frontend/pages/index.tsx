import React from 'react';
import NextLink from 'next/link';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Box, Container, Link, Toolbar, Typography } from '@material-ui/core';

import Shortner from '../src/components/Shortner';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">      
      <Link color="inherit" href="#">
        Shortner by @felipehfj
      </Link>
      {' | '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
  }
}));


export default function Pricing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Shortner
          </Typography>
          <NextLink href="/login" as="/login">
            <Button color="primary" variant="outlined" className={classes.link}>
              Login
            </Button>
          </NextLink>

        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Encurtar URL
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="div">
          <Shortner />
        </Typography>
      </Container>

      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={1}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}