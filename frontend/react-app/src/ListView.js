import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './Header';
import TitleCard from './TitleCard';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function ListView(props) {
  return (
    <Box>
      <Header changeView={props.changeView} />
      <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <TitleCard />
        <Box sx={{ height: 100 }} />
      </Stack>
      <Fab color='primary' sx={{ position: 'fixed', right: 24, bottom: 24 }}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default ListView;