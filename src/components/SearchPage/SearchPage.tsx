import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../helpers/helpers';
import SearchForm from '../SearchForm/SearchForm';
import { List } from '@mui/material';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (keyword != '') {
      const today = Date.now();
      const yesterday = new Date(today - 10000000);
      const year = yesterday.getFullYear();
      const month =
        yesterday.getMonth() + 1 < 10
          ? `0${yesterday.getMonth() + 1}`
          : yesterday.getMonth() + 1;

      const day =
        yesterday.getDate() < 10
          ? `0${yesterday.getDate()}`
          : yesterday.getDate();

      const date = `${year}-${month}-${day}`;

      axios
        .get(
          `https://newsapi.org/v2/everything?q=${keyword}&from=${date}&language=en&sortBy=popularity&apiKEY=${API_KEY}`
        )
        .then((data) => {
          setArticles(data.data.articles);
        })
        .catch((err) => console.error(err.message));
    }
  }, [keyword]);

  return (
    <>
      <SearchForm />
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          alignContent: 'center',
        }}
      ></List>
    </>
  );
};

export default SearchPage;

// 1. Stwórz stan keyword, wartość początkowa ''
// 2. Stwórz stan articles, wartość początkowa []
// 3. Wywołaj useEffect, zapełniona lista dependencji, reakcja na zmiane keyword
// W UE:
// 4. Stwórz ifa w którym sprawdzisz czy keyword jest różny od pustego stringa
// W ifie:
// 5. Strzał do API axiosem, url: https://newsapi.org/v2/everything?q=*tutaj dynamicznie wstawiany stan keyword*&from=2022-11-14&language=en&sortBy=popularity&apiKey=${API_KEY}
// 6. Do wywołania axiosa przypnij thena, w thenie wywołanie setArticles(data.data.articles), parametr thena nazwij data
// JSX:
// - Wyświetlenie SearchForm
// - List (MUI) sx: width 100%, bgcolor: background.paper, alignContent center
