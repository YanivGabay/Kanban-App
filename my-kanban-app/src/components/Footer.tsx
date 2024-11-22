import { Box, Container, Typography, Link } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          My Kanban App © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Made with love by Yaniv. Visit me at {' '}
          <Link color="inherit" href="https://github.com/YanivGabay">
        github.com/YanivGabay
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
