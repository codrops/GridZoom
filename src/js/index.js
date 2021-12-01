import { preloadImages } from './utils';
import { Grid } from './grid';

// Initialize the grid
new Grid(document.querySelector('.grid--large'));

// Preload images then remove loader (loading class) from body
preloadImages('.grid__cell-img-inner, .slide-nav__img').then(() => document.body.classList.remove('loading'));