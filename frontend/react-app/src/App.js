import * as React from 'react';
import Box from '@mui/material/Box';
import DetailView from './DetailView';
import ListView from './ListView';
import EditView from './EditView';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import './App.css';

function App() {
  const view = <DetailView />;
  return (
    <Box className='App'>
      {view}
    </Box>
  );
}

export default App;
