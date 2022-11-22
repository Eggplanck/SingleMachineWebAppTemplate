import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Header from './Header';
import { authApi } from './axiosApi';
import { useEffect, useState } from 'react';


function EditView(props) {
  const memoId = props.memoId;
  const [data, setData] = useState({})
  useEffect(() => {
    if (localStorage.getItem('token')===null){
      props.changeView("SignIn");
      return;
    }
    if (memoId >= 0) {
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
      setData({
        title: "",
        content: ""
      });
    }
  }, []);

  const handleSubmit= (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const request_body = {
      'title': formdata.get('title'),
      'content': formdata.get('content')
    }
    if (memoId >= 0) {
      authApi.put(`/memos/${memoId}`, request_body)
      .then((response) => {
        props.changeView('List');
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
    }else{
      authApi.post('/memos/', request_body)
      .then((response) => {
        props.changeView('List');
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
    }
  };

  if (data.title===undefined){
    return (
      <Box>
        <Header changeView={props.changeView} />
      </Box>
    );
  }
  return (
    <Box>
      <Header changeView={props.changeView} />
      <Container maxWidth='xl' component='form' onSubmit={handleSubmit}>
        <TextField required multiline minRows={1} maxRows={2} variant='standard' name='title' label='Title' defaultValue={data.title} margin='normal' sx={{ width: '50ch', maxWidth: '100%' }} />
        <TextField multiline minRows={4} variant='outlined' name='content' label='Content' defaultValue={data.content} margin='normal' sx={{ width: '100%' }} />
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button variant='contained' type="submit" color='primary' sx={{ mr: 1 }} startIcon={<ArrowUpwardIcon />}>
            Submit
          </Button>
          <Button variant='contained' color='error' sx={{ mr: 1 }} startIcon={<CancelIcon />} onClick={() => { props.changeView('Detail', memoId) }} >
            Cancel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default EditView;