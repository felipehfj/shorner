import React from 'react';
import { Paper, Button, Typography, Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { DataGrid, GridColDef } from '@material-ui/data-grid';

import datetiemUtils from '../utils/datetimeUtils';

const useStyles = makeStyles({
  paper: {
    padding: 10
  }
});

UrlDataUnit.propTypes = {
  url: PropTypes.shape({
    url: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      shortId: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired
    }).isRequired,
    urlAccess: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      accessAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired
    }))
  })

};

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UrlDataUnit(props) {
  const router = useRouter();
  const classes = useStyles();

  const url: UrlModel = props.url.url;
  const urlAccess: Array<UrlAccessModel> = props.url.urlAccess.map(item => { return { ...item, id: item._id, accessAt: datetiemUtils.format(item.accessAt) } });


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300, align: 'center', headerAlign: 'center' },
    { field: 'accessAt', headerName: 'Acesso', width: 650, align: 'center', headerAlign: 'center' },
  ];

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5" component="h2">
          URL ID: {url.shortId}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {url.url}
        </Typography>
      </Paper>


      <Tooltip title={'Visitar o site'} TransitionComponent={Zoom} enterDelay={1000} leaveDelay={200} >
        <Button size="small" color="primary" href={`${NEXT_PUBLIC_API_URL}/${url.shortId}`} target={'_blank'} rel={'noopener'}>
          Visitar
        </Button>
      </Tooltip>


      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={urlAccess} columns={columns} pageSize={100} />
      </div>

    </React.Fragment>
  );
}