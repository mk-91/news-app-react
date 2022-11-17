import React from 'react';
import { Typography, TextField, Button, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../../helpers/interfaces';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const registerUser = ({ email, password, password2 }: RegisterFormData) => {
    if (password === password2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      alert('Password are not equal!');
    }

    // NIE UŻYWAJ LINKóW GSTATIC DO IMPORTOW Z FB, MOŻESZ UŻYC NP. firebase/app, firebase/auth
    // Stwórz projekt firebase, włącz w nim authentication oraz logowanie przez email/password
    // 1. Sprawdź czy hasła się zgadzają (czy są identyczne)
    // 2. Jeżeli tak, wywołaj odpowiednią funkcję firebase'ową i zarejestruj użytkownika
    // 3. Do tej funkcji (pkt 2) podepnij thena, w nim console.log('success') i do tego catch console.log(error)
  };

  return (
    <Card sx={{ my: '1rem', p: '1rem' }}>
      {' '}
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(registerUser)}
      >
        <Typography align='center' variant='h2' sx={{ fontSize: '1.5' }}>
          Register new account
        </Typography>
        <TextField
          type='email'
          placeholder='email'
          sx={{ display: 'block', mx: 'auto', my: '0.5rem' }}
          {...register('email', { required: true })}
        ></TextField>
        <TextField
          type='password'
          placeholder='password'
          sx={{ display: 'block', mx: 'auto', my: '0.5rem' }}
          {...register('password', { required: true })}
        ></TextField>
        <TextField
          type='password'
          placeholder='repeat password'
          sx={{ display: 'block', mx: 'auto', my: '0.5rem' }}
          {...register('password2', { required: true })}
        ></TextField>
        <Button
          variant='contained'
          type='submit'
          sx={{ display: 'block', mx: 'auto' }}
        >
          REGISTER
        </Button>
      </form>
    </Card>
  );
};

export default RegisterPage;
// JSX:
// Całość ma być obwinięta tagiem <form> (HTML) nadaj mu display flex oraz flexDirection column
// 1. Typography wyśrodkowane, wygląd h2, rozmiar czcionki 1.5rem i textContent Register new account
// 2. TextField type email, placeholder email, w sx'ach display block, mx auto, my .5rem
// 3. TextField type password, placeholder password, w sx'ach display block, mx auto, my .5rem
// 4. TextField type password, placeholder repeat password, w sx'ach display block, mx auto, my .5rem
// 5. Button (z MUI) variant contained, type submit w sx'ach display block i mx auto
