import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Header from './Header';


function SignUpView() {
  return (
    <Box>
      <Header showButton={false} />
      <Container maxWidth='xs' sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h3">
          Sign Up
        </Typography>
        <Box component='form'>
          <TextField margin="normal" required fullWidth label="Username" autoFocus />
          <TextField margin="normal" required fullWidth label="Password" type="password" autoComplete="current-password" />
          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUpView;