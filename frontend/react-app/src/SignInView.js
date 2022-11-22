import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Header from './Header';
import { noAuthApi } from './axiosApi';


function SignInView(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    noAuthApi.post('/token', data)
      .then((response) => {
        localStorage.setItem('token', response.data.access_token);
        props.changeView('List');
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <Box>
      <Header />
      <Container maxWidth='xs' sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h3">
          Sign In
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField margin="normal" required fullWidth name='username' label="Username" autoFocus />
          <TextField margin="normal" required fullWidth name='password' label="Password" type="password" autoComplete="current-password" />
          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link component='button' onClick={()=>{props.changeView('SignUp')}}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default SignInView;