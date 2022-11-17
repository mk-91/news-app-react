import React from 'react';
import { ArticleProps } from '../helpers/interfaces';
import { ListItem, ListItemText, Card } from '@mui/material';

const Article: React.FC<ArticleProps> = ({ art }) => {
  return (
    <ListItem>
      <Card variant='outlined' sx={{ mb: '10px' }}>
        <a href={art.url} style={{ textDecoration: 'none' }} target='__blank'>
          <img src={art.urlToImage} alt={art.title} style={{ width: '100%' }} />
          <ListItemText sx={{ color: 'black' }}>{art.title}</ListItemText>
        </a>
      </Card>
    </ListItem>
  );
};

export default Article;
