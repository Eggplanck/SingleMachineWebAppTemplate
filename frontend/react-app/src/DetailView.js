import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Fab from '@mui/material/Fab';
import Header from './Header';
import { authApi } from './axiosApi';
import { useEffect, useState } from 'react';


function DetailView(props) {
  const memoId = props.memoId;
  const [data, setData] = useState({})
  useEffect(() => {
    if (localStorage.getItem('token')===null){
      props.changeView("SignIn");
      return;
    }
    if (memoId >= 0){
      authApi.get(`/memos/${memoId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
        if (error.response.status===401){
          localStorage.removeItem('token');
          props.changeView('SignIn');
        }
      });
    }else{
      props.changeView('List');
    }
  }, []);

  const handleDelete = () => {
    alert('Delete this Memo?');
    authApi.delete(`/memos/${memoId}`)
      .then((response) => {
        props.changeView('List');
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <Box>
      <Header changeView={props.changeView} />
      <Container maxWidth='xl'>
        <Box>
          <Typography variant="h3" color="text.primary">
            {data.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.create_time}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ overflowWrap: 'break-word' }}>
          <Typography variant="body1" color="text.primary">
            {data.content}
          </Typography>
        </Box>
        <Box sx={{ height: 100 }} />
      </Container>
      <Box sx={{ position: 'fixed', right: 24, bottom: 24 }}>
        <Fab color='primary' sx={{ mr: 1 }} onClick={()=>{props.changeView('Edit', memoId)}}>
          <EditIcon />
        </Fab>
        <Fab color='error' sx={{ mr: 1 }} onClick={handleDelete}>
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