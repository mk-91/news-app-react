import React from 'react';
import { useForm } from 'react-hook-form';
import { SearchFormData } from '../helpers/interfaces';
import { Card, TextField, Button } from '@mui/material';

const SearchForm = () => {
  // 1. Import i wywołanie useForm (z odpowiednim interfejsem)
  // 2. Stwórz pustą funkcję liftKeywordUp
  // 3. JSX:
  // - <form> (HTML) onSubmit tak jak wcześniej, w style: display flex, flexDirection column
  // W środku forma:
  // - TextField (MUI) placeholder Keyword, zarejestruj pod nazwą keyword, w sx'ach: my .5rem, display block, mx auto
  // - Button (MUI) variant contained, type submit, sx: display block, mx auto. TextContent: Search
  // 4. Wartość inputu to string, stwórz odpowiedni interface i przypisz do wywołania useForm i do funkcji liftKeywordUp, w liftKeywordUp console.log(*dane*)
  const { register, handleSubmit } = useForm<SearchFormData>();

  const liftKeywordUp = ({ keyword }: SearchFormData) => {
    console.log(keyword);
  };

  return (
    <Card>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(liftKeywordUp)}
      >
        <TextField
          placeholder='Keyword'
          type='string'
          sx={{ display: 'block', my: '0.5rem', mx: 'auto' }}
          {...register('keyword', { required: true })}
        ></TextField>
        <Button
          variant='contained'
          type='submit'
          sx={{ display: 'block', mx: 'auto' }}
        >
          Search
        </Button>
      </form>
    </Card>
  );
};

export default SearchForm;
