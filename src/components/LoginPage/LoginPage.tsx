import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Typography, Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <Card sx={{ mt: '0.5rem' }}>
        <Typography variant='h6' sx={{ fontWeight: 100, textAlign: 'center' }}>
          Don't have an account yet? Register now!
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <Button variant='outlined' sx={{ display: 'block', mx: 'auto' }}>
              Register
            </Button>
          </Link>
        </Typography>
      </Card>
    </>
  );
};

export default LoginPage;

// 1. Stwórz folder i plik LoginPage, w środku komponent
// Równorzędnie wyświetlone w JSX:
// - LoginForm
// - Typography variant h6, w sx'ach: fontWeight 100, textAlign center. TextContent: Don't have an account yet? Register now!
// - Link (RRD) to /register w style: textDecoration none
// W środku Linka:
// - Button variant outlined w sx'ach: display block, mx auto. TextContent Register
// 2. W App.tsx, stwórz Route /login i wyświetl w nim LoginPage
