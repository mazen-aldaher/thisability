import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import mock5 from '../../assets/ill/mock-5.png';
import mock6 from '../../assets/ill/mock-6.png';
import brile from '../../assets/ill/prile.png';
import art from '../../assets/ill/art-ist/WHISPORTH_OF_THE_WIND.png';
import FloatObj from '../../components/FloatObj';
import mock7 from '../../assets/ill/mock-7.png';
import ProductsArtistList from './components/ProductArtistList';
import Artist from './components/Artist';

const artistProfile = [
  {
    id: 1,
    artistName: 'Hanan Mohamed',
    artistImg:
      'https://t3.ftcdn.net/jpg/01/79/46/68/360_F_179466839_nARiMdo6ocQWnw6X5YyecerwSYnAVb88.jpg',
    descriptionGeneral:
      'The tactile dimensions of colorful paper cuts designed to be experienced through touch. The artwork depicts the power of imagination in the eye’s mind to perceive beauty.',
    artistClip: 'https://www.youtube.com/embed/DmOjmasF20I',
    ill1: '',
    ill2: '',
    descriptionMain: 'Discover Hend Khalil, a visionary artist who transitioned from traditional painting to creating tactile artworks using materials like foam, wires, seeds, cotton, and paper cuts. Guided by touch,she crafts stunning collage paintings that express the true art beyond vision.',
    descriptionAtelih: '',
    artImg: art,
    artTitle: 'WHISPERS OF THE WIND',
    artDescription: 'Each element weaves a story of resilience and grace,portraying her joyful dance as a celebration of overcoming life’s challenges. The artwork is a touching reminder of the beauty and strength found in embracing our journeys with open hearts.',
  },
];

const data = [
  {
    id: 1,
    category: 'paint',
    productTitle: 'Take a look at my Ability',
    description:
      'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
    artImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    price: 9600,
    artistName: 'Mazen',
    socialMedia: [
      { id: 1, title: 'facebook', url: 'www.facebook.com' },
      { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
      { id: 3, title: 'instagram', url: 'www.instagram.com' },
    ],
    bidding: {
      biddingStartPrice: 5000,
      currentBid: 7500,
      bidEndTime: '2024-12-31T23:59:59',
      numberOfBids: 10,
    },
  },
  {
    id: 2,
    category: 'art',
    productTitle: 'Artistic Vision',
    description:
      'Inspiring creativity through art, encouraging students to see the world in a new way.',
    artImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    price: 9600,
    artistName: 'Mazen',
    socialMedia: [
      { id: 1, title: 'facebook', url: 'www.facebook.com' },
      { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
      { id: 3, title: 'instagram', url: 'www.instagram.com' },
    ],
    bidding: {
      biddingStartPrice: 3000,
      currentBid: 5500,
      bidEndTime: '2024-12-20T23:59:59',
      numberOfBids: 8,
    },
  },
  {
    id: 3,
    category: 'paint',
    productTitle: 'Colorful Journey',
    description:
      'Exploring the vibrant world of colors through the lens of artistic expression.',
    artImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    price: 9600,
    artistName: 'Mazen',
    socialMedia: [
      { id: 1, title: 'facebook', url: 'www.facebook.com' },
      { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
      { id: 3, title: 'instagram', url: 'www.instagram.com' },
    ],
    bidding: {
      biddingStartPrice: 4500,
      currentBid: 6000,
      bidEndTime: '2024-12-15T23:59:59',
      numberOfBids: 5,
    },
  },
  {
    id: 4,
    category: 'handmade',
    productTitle: 'Crafted Beauty',
    description:
      'Handmade creations that bring beauty and uniqueness to everyday life.',
    artImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    price: 9600,
    artistName: 'Mazen',
    socialMedia: [
      { id: 1, title: 'facebook', url: 'www.facebook.com' },
      { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
      { id: 3, title: 'instagram', url: 'www.instagram.com' },
    ],
    bidding: {
      biddingStartPrice: 3500,
      currentBid: 4800,
      bidEndTime: '2024-12-10T23:59:59',
      numberOfBids: 7,
    },
  },
  {
    id: 5,
    category: 'art',
    productTitle: 'Artistic Dream',
    description:
      'Art that challenges the norm and pushes the boundaries of imagination.',
    artImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    price: 9600,
    artistName: 'Mazen',
    socialMedia: [
      { id: 1, title: 'facebook', url: 'www.facebook.com' },
      { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
      { id: 3, title: 'instagram', url: 'www.instagram.com' },
    ],
    bidding: {
      biddingStartPrice: 4000,
      currentBid: 6300,
      bidEndTime: '2024-12-18T23:59:59',
      numberOfBids: 9,
    },
  },
  {
    id: 6,
    category: 'handmade',
    productTitle: 'Handcrafted Masterpiece',
    description:
      'A one-of-a-kind handmade piece that showcases exceptional skill and creativity.',
    artImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    price: 9600,
    artistName: 'Mazen',
    socialMedia: [
      { id: 1, title: 'facebook', url: 'www.facebook.com' },
      { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
      { id: 3, title: 'instagram', url: 'www.instagram.com' },
    ],
    bidding: {
      biddingStartPrice: 5000,
      currentBid: 7000,
      bidEndTime: '2024-12-25T23:59:59',
      numberOfBids: 12,
    },
  },
];

const ArtistPage = () => {
  return (
    <>
      <Box>
        <Artist data={data} artist={artistProfile} />
      </Box>
    </>
  );
};

export default ArtistPage;
