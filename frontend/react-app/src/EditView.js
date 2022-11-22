import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Header from './Header';


function EditView(props) {
  const title = 'Title';
  const content = 'Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.Content.';
  return (
    <Box>
      <Header changeView={props.changeView} />
      <Container maxWidth='xl'>
        <TextField required multiline minRows={1} maxRows={2} variant='standard' label='Title' value={title} margin='normal' sx={{ width: '50ch', maxWidth: '100%' }} />
        <TextField multiline minRows={4} variant='outlined' label='Content' value={content} margin='normal' sx={{ width: '100%' }} />
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button variant='contained' color='primary' sx={{ mr: 1 }} startIcon={<ArrowUpwardIcon />}>
            Submit
          </Button>
          <Button variant='contained' color='error' sx={{ mr: 1 }} startIcon={<CancelIcon />}>
            Cancel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default EditView;