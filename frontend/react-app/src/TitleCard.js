import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TitleCard(props) {
  const title = 'Title';
  const date = '2022-10-13 22:50:00';
  const memoId = 1;
  return (
    <Card variant="outlined" sx={{ width: "99%" }}>
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{props.changeView('Detail', memoId)}} >detail</Button>
      </CardActions>
    </Card>
  );
}

export default TitleCard;