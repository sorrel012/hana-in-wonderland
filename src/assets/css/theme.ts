import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  home: {
    bgColor: `linear-gradient(180deg, rgba(255, 249, 237, 0.86) 0%, rgba(255, 223, 225, 0.82) 51%, rgba(255, 237, 223, 0.82) 100%)`,
    titleColor: '#FFFFFF',
    textColor: '#6D422A',
  },
  header: {
    profile: {
      bgColor: 'transparent',
      textColor: '#FFFFFF',
      borderColor: '#FFFFFF',
    },
    skills: {
      bgColor: 'rgba(255,255,255,0.5)',
      textColor: '#75A1CA',
      borderColor: 'transparent',
    },
    projects: {
      bgColor: 'rgba(255,255,255,0.5)',
      textColor: '#6C8F5C',
      borderColor: 'transparent',
    },
    contact: {
      bgColor: 'transparent',
      textColor: '#FFFFFF',
      borderColor: '#FFFFFF',
    },
    login: {
      bgColor: 'rgba(255,255,255,0.5)',
      textColor: '#EB837F',
      borderColor: 'transparent',
    },
  },
  profile: {
    bgColor: `linear-gradient(180deg, #B0E0E6 0%, #87CEEB 17%, #1E90FF 70.5%, #0077BE 99%)`,
    boxColor: 'rgba(255, 255, 255, 0.5)',
    titleColor: '#FFFFFF',
    labelColor: '#880000',
    textColor: '#363636',
  },
  skills: {
    bgColor: `linear-gradient(180deg, #E9F9FD 0%, #D4F9FC 71%, #FFDAAE 100%)`,
    textColor: '#FFFFFF',
  },
  projects: {
    headerBgColor: '#FFFFFF',
    headerTextColor: '#AE0000',
    bgColor: '#E9EDC9',
    wrapperBgColor: 'rgba(212,163,115,0.6)',
    contentBgColor: '#FAEDCD',
  },
  contact: {
    bgColor: `linear-gradient(180deg, #03255F 0%, #072B69 48%, #001231 100%)`,
    headerColor: '#FFFFFF',
    textColor: '#001663',
    boxColor: '#B4BDCB',
  },
  admin: {
    loginColor: '#6D422A',
    navBgColor: '#F8EDEB',
    navBorderColor: '#D39090',
    navTextColor: '#AF6C63',
    navTextHoverColor: '#EB837F',
    textColor: '#8A5B30',
    bgColor: '#F5F5F5',
    wrapperBgColor: '#FFFFFF',
    wrapperBorderColor: '#E3D5CA',
  },
};
