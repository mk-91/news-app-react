import { Button, Card, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth, storage } from '../../firebaseConfig';
import { ProfilePhotoFormData } from '../helpers/interfaces';
import { ref, uploadBytes } from 'firebase/storage';

const ProfilePhotoForm = () => {
  const { register, handleSubmit } = useForm<ProfilePhotoFormData>();

  const uploadPhoto = ({ profilePhotoList }: ProfilePhotoFormData) => {
    const profilePhoto = profilePhotoList[0];
    if (auth.currentUser) {
      const storageRef = ref(
        storage,
        `users/${auth.currentUser.uid}/profilePhoto`
      );
      uploadBytes(storageRef, profilePhoto)
        .then(() => console.log('Uploaded the file succesfully'))
        .catch((err) => console.error(err.message));
    }
    // 1. Parametr tej funkcji to obiekt data w którym zawarte będą dane z formularza, stwórz interface do tych danych, jedyne pole w tym interfejsie przyjmie typ FileList
    // 2. Wyciągnij samo zdjęcie z FileListy do osobnej zmiennej
    // 3. Sprawdź czy auth.currentUser jest prawdziwy (ifem)
    // 4. W ifie ułóż referencje do storagu, użyj do tego funkcji ref (firebase/storage) ("users/{auth.currentUser.uid}/profilePhoto")
    // 5. (w ifie) Wywołanie funkcji uploadBytes (firebase/storage), argumenty: referencja z pkt 4 i sam plik
    // 6. (w ifie) Doklej thena z informacja o sukcesie i catcha z wyswietleniem errora
  };

  return (
    <form onSubmit={handleSubmit(uploadPhoto)}>
      <Card sx={{ p: '1rem' }}>
        <Typography variant='h6' align='center' sx={{ fontSize: '1rem' }}>
          Upload your profile picture
        </Typography>
        <Button
          variant='contained'
          component='label'
          sx={{
            display: 'block',
            mx: 'auto',
            my: '1rem',
            alignContent: 'center',
          }}
        >
          <Typography variant='h6' align='center' sx={{ fontSize: '1rem' }}>
            Select a file
          </Typography>
          <input
            hidden
            type='file'
            {...register('profilePhotoList', { required: true })}
          />
        </Button>
        <Button
          type='submit'
          variant='contained'
          sx={{ display: 'block', mx: 'auto' }}
        >
          Upload
        </Button>
      </Card>
    </form>
  );
};

export default ProfilePhotoForm;

// 1. Import i wywołanie useForm
// 2. Stwórz pustą funkcję uploadPhoto
// JSX:
// 3. <form> (HTMLowy) z onSubmitem tak jak w poprzednich przykładach
// W formie:
// 4. Card (MUI) sx: p 1rem
// W Card:
// 5. Typography variant h6, align center, w sx'ach: fontSize 1rem. TextContent: Upload your profile picture
// 6. Button (MUI) variant contained, component label, w sx'ach: display block, mx auto, my 1rem, alignContent center
// W środku Buttona:
// 7. Typography variant h6, align center, sx: fontSize 1rem. TextContent Select a file
// (Nadal w buttonie)
// 8. input (hmtlowy) type="file", hidden, zarejestruj go pod nazwą profilePhoto
// koniec buttona
// 9. Button (MUI), type submit, variant contained, sx: display block, mx auto. TextContent: Upload
