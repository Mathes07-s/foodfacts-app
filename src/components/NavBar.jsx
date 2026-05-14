import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

function NavBar() {
  const savedCount = useSelector((state) => state.saved.items.length);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          🍎 FoodFacts
        </Typography>
        <div>
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/saved"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Saved
            {savedCount > 0 && (
              <Badge badgeContent={savedCount} color="secondary" sx={{ ml: 1 }} />
            )}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;