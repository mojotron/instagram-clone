import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostImage from '../PostImage';

const mockDimensions = {
  aspectRatio: { width: '100%', height: '100%' },
  zoomLevel: '1',
  position: { x: 0, y: 0 },
};

const mockImagesData = [
  {
    url: '/images/img1.jpg',
    alt: 'temp text',
    filter: 'brightness(1.25) contrast(1.5) saturate(1.75)',
    layers: [
      { backgroundColor: 'rgba(25,25,0,0.25)' },
      { backgroundColor: 'rgba(255,255,255,0.25)' },
      { boxShadow: 'inset 0px 0px 75px black' },
    ],
  },
];

describe('PostImage component', () => {
  test('', () => {});
});
