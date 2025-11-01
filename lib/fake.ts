import { ImageSourcePropType } from 'react-native';
import { Candidate } from './models';

export const countries = [
  { id: '1', title: 'Nepal' },
  { id: '2', title: 'India' },
].map((i) => ({ label: i.title, value: i.title }));

export const provinces = [
  { id: '1', title: 'Koshi Pradesh' },
  { id: '2', title: 'Madhesh Pradesh' },
  { id: '3', title: 'Bagmati Pradesh' },
  { id: '4', title: 'Gandaki Pradesh' },
  { id: '5', title: 'Lumbini Pradesh' },
  { id: '6', title: 'Karnali Pradesh' },
  { id: '7', title: 'Sudurpaschim Pradesh' },
].map((i) => ({ label: i.title, value: i.title }));

export const districts = [
  { id: '1', title: 'Kathmandu' },
  { id: '2', title: 'Lalitput' },
  { id: '3', title: 'Bhaktapur' },
  { id: '4', title: 'Makwanpur' },
  { id: '5', title: 'Bara' },
  { id: '6', title: 'Parsa' },
  { id: '7', title: 'Rautahat' },
].map((i) => ({ label: i.title, value: i.title }));

export const muncipalities = [
  { id: '1', title: 'Kathmandu Metropolitan' },
  { id: '2', title: 'Lalitpur Metropolitan' },
  { id: '3', title: 'Chitwan Metropolitan' },
  { id: '4', title: 'Kalaiya Metropolitan' },
].map((i) => ({ label: i.title, value: i.title }));

export const candidates: Candidate[] = [
  {
    id: 0,
    name: 'Balen Shah',
    party: 'Independent',
    avatar: require('@/assets/people/balen.jpg'),
    votes: 45090,
    verified: true,
  },
  {
    id: 12,
    name: 'Sagar Dhakal',
    party: 'Independent',
    avatar: require('@/assets/people/sagar.jpg'),
    votes: 1100,
    verified: true,
  },
  {
    id: 1,
    name: 'Harka Raj Rai',
    party: 'Independent',
    avatar: require('@/assets/people/harka.jpg'),
    votes: 1100,
    verified: true,
  },
  {
    id: 2,
    name: 'Sumana Shrestha',
    party: 'Rastriya Swatantra Party',
    avatar: require('@/assets/people/sumana.jpg'),
    votes: 7980,
    verified: false,
  },
  {
    id: 3,
    name: 'Gopal Hamal',
    party: 'Independent',
    avatar: require('@/assets/people/gopal.jpg'),
    votes: 150,
    verified: true,
  },
  {
    id: 4,
    name: 'KP Sharma Oli',
    party: 'Communist Party of Nepal (Unified Marxist-Leninist) ',
    avatar: require('@/assets/people/kpoli.jpg'),
    votes: 0,
    verified: true,
  },
  {
    id: 6,
    name: 'Rabi Lamichhane',
    party: 'Rastriya Swatantra Party',
    avatar: require('@/assets/people/rabi.jpg'),
    votes: 4400,
    verified: false,
  },
];
