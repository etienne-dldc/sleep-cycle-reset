import styled from 'react-emotion';
import { Colors, H1 } from '@blueprintjs/core';

export const Title = styled(H1)({
  fontWeight: 100,
});

export const Header = styled('header')({
  padding: '1rem',
  paddingTop: '3rem',
});

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  width: '100%',
});

export const PopoverContainer = styled('div')({
  padding: '2rem',
  width: '400px',
});

export const Columns = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  justifyContent: 'center',
  padding: 20,
  '& > *': {
    flex: 1,
    maxWidth: 500,
    marginRight: 20,
    '&:last-child': {
      marginRight: 0,
    },
  },
  '@media (max-width: 800px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    '& > *': {
      maxWidth: 'initial',
      flex: 'initial',
      marginRight: 0,
      marginBottom: 20,
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
});

export const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexShrink: 0,
  '& > *': {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

export const Footer = styled('footer')({
  color: 'white',
  padding: '2rem',
});

export const Link = styled('a')({
  cursor: 'pointer',
  color: Colors.BLUE4,
  '&:active': {
    color: Colors.BLUE5,
  },
});
