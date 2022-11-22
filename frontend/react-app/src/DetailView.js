import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Fab from '@mui/material/Fab';
import Header from './Header';


function DetailView(props) {
  const memoId = props.memoId;
  const title = 'Title';
  const date = '2022-10-13 22:50:00';
  const content = 'Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.';
  return (
    <Box>
      <Header changeView={props.changeView} />
      <Container maxWidth='xl'>
        <Box>
          <Typography variant="h3" color="text.primary">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {date}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ overflowWrap: 'break-word' }}>
          <Typography variant="body1" color="text.primary">
            {content}
          </Typography>
        </Box>
        <Box sx={{ height: 100 }} />
      </Container>
      <Box sx={{ position: 'fixed', right: 24, bottom: 24 }}>
        <Fab color='primary' sx={{ mr: 1 }} onClick={()=>{props.changeView('Edit', memoId)}}>
          <EditIcon />
        </Fab>
        <Fab color='error' sx={{ mr: 1 }}>
          <DeleteIcon />
        </Fab>
      </Box>
      <Box sx={{ position: 'fixed', left: 24, bottom: 24 }}>
        <Fab onClick={()=>{props.changeView('List')}}>
          <NavigateBeforeIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default DetailView;