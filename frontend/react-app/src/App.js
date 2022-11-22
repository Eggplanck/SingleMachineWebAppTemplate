import { useState } from 'react';
import Box from '@mui/material/Box';
import DetailView from './DetailView';
import ListView from './ListView';
import EditView from './EditView';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('List');
  const [memoId, setMemoId] = useState(-1);

  const changeView = (viewMode, memoId = -1) => {
    setViewMode(viewMode);
    setMemoId(memoId);
  };

  const modeToView = (viewMode, memoId) => {
    switch (viewMode) {
      case 'List':
        return <ListView changeView={changeView} />;
      case 'Detail':
        return <DetailView changeView={changeView} memoId={memoId} />;
      case 'Edit':
        return <EditView changeView={changeView} memoId={memoId} />;
      case 'SignIn':
        return <SignInView changeView={changeView} />;
      case 'SignUp':
        return <SignUpView changeView={changeView} />;
      default:
        return <SignInView changeView={changeView} />;
    }
  };

  const view = modeToView(viewMode, memoId);

  return (
    <Box className='App'>
      {view}
    </Box>
  );
}

export default App;
