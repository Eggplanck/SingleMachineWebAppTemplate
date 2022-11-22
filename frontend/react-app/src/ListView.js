import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './Header';
import TitleCard from './TitleCard';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { authApi } from './axiosApi';
import { useState, useEffect } from 'react';

function ListView(props) {
  const [titleCardList, setTitleCardList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      props.changeView("SignIn");
      return;
    }
    authApi.get('/memos/')
      .then((response) => {
        setTitleCardList(response.data.map(data => <TitleCard changeView={props.changeView} data={data} key={data.id} />));
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          props.changeView('SignIn');
        }
      });
  }, []);

  return (
    <Box>
      <Header changeView={props.changeView} />
      <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
        {titleCardList}
        <Box sx={{ height: 100 }} />
      </Stack>
      <Fab color='primary' sx={{ position: 'fixed', right: 24, bottom: 24 }} onClick={() => { props.changeView('Edit') }}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default ListView;