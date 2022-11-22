import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header(props) {
  let signOutButton = null;
  if (props.changeView) {
    const handleSignOut = () => {
      localStorage.removeItem('token');
      props.changeView('SignIn');
    };
    signOutButton = <Button color="secondary" variant="contained" onClick={handleSignOut}>SignOut</Button>;
  }
  return (
    <AppBar sx={{ width: "100%" }} position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
          Memo
        </Typography>
        {signOutButton}
      </Toolbar>
    </AppBar>
  );
}

export default Header;