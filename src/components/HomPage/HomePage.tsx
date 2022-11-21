import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../../helpers/helpers';
import { Typography, List } from '@mui/material';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const HomePage = () => {
  const [todaysArticles, setTodaysArticles] = useState([]);

  useEffect(() => {
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
    // console.log(date);

    axios
      .get(
        `https://newsapi.org/v2/everything?q=world&from=${date}&language=en&sortBy=popularity&apiKEY=${API_KEY}`
      )
      .then((response) => {
        setTodaysArticles(response.data.articles);
      })
      .catch((err) => console.error(err.message));

    // 1. Stwórz stan todaysArticles (funckja aktualizujaca stan będzie sie nazywala setTodaysArticles), wartość początkowa: [] (pusta lista)
    // 2. Do axios.get dopisz thena, w którym wrzucisz zwrócone z API dane do stanu todaysArticles (dane o ktore nam chodzi to lista artykułow, jest ona zagnieżdzona na 2 poziome w responsie, najpierw wyloguj response i poszukaj)
    // 3. Dopisz catcha, w srodku console.log blad
    // 4. Zauważ różnice w działaniu axiosa i fetcha, zapisz tą różnice
    // FN CLEANUP - opcjonalne, wykona się po odmontowaniu komponentu
    // return () => {};
  }, []);

  return (
    /* Wyświetl Typography, ma wyglądać jak h2, ma być wyśrodkowany, wielkość czcionki ma być ustawiona na 2rem, margines dolny ma być ustawiony .8rem, wyświetlany tekst: "Today's hottest news:" */
    /* Wyświetl List (komponent z MUI), ustaw jej szerokość na 100%, i wyśrodkuj jej kontent */
    <>
      <Typography
        variant='h2'
        align='center'
        sx={{ fontSize: '2rem', my: '.8rem' }} //w sx są dwie klamry, pierwsza oznacza jsx, druga obiekt
      >
        Today's hottest news:
      </Typography>
      <List sx={{ width: '100%', alignContent: 'center' }}>
        {todaysArticles.length !== 0 && // renderowanie warunkowe, prawa strona od && wykoana się tylko gdy lewa jest prawdziwa
          todaysArticles.map((article: ArticleObj) => {
            return <Article art={article} key={article.title} />;
          })}
      </List>
      {/* {todaysArticles.length !== 0 && (
        <Article art={todaysArticles[0]} key={1} />
      )} */}
    </>
  );

  // Komponent Typography (MUI)
  // 1. Typography to komponent służący do wyświetlania tekstu
  // 2. Przyjmuje kilka ważnych atrybutów: variant="h2", component="h2", align="center", sx (atrybut wszystkich komponentów MUI, i tylko komponentów MUI) to atrybut do którego możemy przekazać obiekt i pisać w nim CSS
  // p = padding, m = margin, mt = marginTop, mb = marginBottom, mx = margin w osi X (marginLeft + marginRight), my = margin w osi Y (marginTop + marginBottom)
  // <Button
  //   variant="outlined"
  //   component="button"
  //   align="center"
  //   sx={{ display: "block", mx: "auto" }}
  // >12332112331</Button>;
  // Komponent List (MUI) = <ul> z HTML'a przystosowany tak, żeby łatwiej się go stylowało
};

export default HomePage;

// Your API key is:
// 3fcddca926a14acdb20c971b5cd5a9d1

// Ściaganie newsów z API oraz ich wyświetlanie
// useEffect
// axios
