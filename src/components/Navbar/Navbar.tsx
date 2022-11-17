import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../helpers/authContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavbarProps } from '../../helpers/interfaces';
import { auth, storage } from '../../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

const pages = ['Home', 'Search'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const loggedIn = useContext(authContext);

  const [profilePhoto, setProfilePhoto] = useState('/');

  useEffect(() => {
    if (loggedIn && auth.currentUser) {
      const storageRef = ref(
        storage,
        `users/${auth.currentUser.uid}/profilePhoto`
      );
      getDownloadURL(storageRef)
        .then((url) => setProfilePhoto(url))
        .catch((err) => console.error(err.message));
    }
  }, [loggedIn]);

  // 1. Stwórz stan profilePhoto (useState), wartość początkowa: '/'
  // 2. Wywołanie useEffect. Zapełniona lista dependencji, reaguj na zmiane loggedIn
  // W UE:
  // 3. Stwórz ifa w którym sprawdziś czy loggedIn jest prawdziwy i czy auth.currentUser jest prawdziwe.
  // W ifie:
  // 4. Stwórz refa (firebase/storage) do storagu (1:1 taki sam jak w poprzednim zadaniu)
  // 5. Wywołanie funkcji getDownloadURL (firebase/storage), funkcja przyjmuje jako argument tylko ref do storagu (pkt 4)
  // 6. Przypnij thena do funkcji z pkt 5, w thenie wpisz w parametr "url", po czym tego urla wrzuć do stanu profilePhoto
  // .then((url) => setProfilePhoto(url))
  // 7. Dopisz catcha
  // 8. Wstaw stan profilePhoto w atrybut src Avatara
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page}
                  to={page === 'Home' ? '/' : '/search'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 100,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SDA NEWS
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {/* 1. W zależności od stanu loggedIn, ustaw atrybut "to" Linka na "/user" lub "/login". Jeżeli loggedIn jest równe true, to "/user", jeżeli loggedIn jest równe false to "/login" */}
            <Link
              to={loggedIn ? '/user' : '/login'}
              style={{ textDecoration: 'none' }}
            >
              {/* Renderowanie warunkowe: jeżeli loggedIn jest równe true, wyświetl IconButton (po prostu to co już jest), jeżeli loggedIn jest równy false, wyświetl Button (MUI), w sx'ach my 2, color white, display block. TextContent: Log in */}
              {loggedIn ? (
                <IconButton sx={{ p: 0 }}>
                  {profilePhoto !== '/' && (
                    <Avatar alt='profile photo' src={profilePhoto} />
                  )}
                </IconButton>
              ) : (
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Log in
                </Button>
              )}
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
