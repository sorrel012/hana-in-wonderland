import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const HeaderWrapper = styled.header<IHeaderProps>`
  position: absolute;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  z-index: 99;
`;

const HomeButton = styled.button<IHeaderProps>`
  border: 1px solid ${(props) => props.theme.header[props.category].borderColor};
  border-radius: 8px;
  background-color: ${(props) => props.theme.header[props.category].bgColor};
  font-size: 1.5vw;
  color: ${(props) => props.theme.header[props.category].textColor};
  padding: 8px 20px;
  cursor: pointer;
`;

const Category = styled.div``;

const Button = styled.button<IHeaderProps>`
  border: 1px solid ${(props) => props.theme.header[props.category].borderColor};
  border-radius: 8px;
  background-color: ${(props) => props.theme.header[props.category].bgColor};
  font-size: 1.5vw;
  color: ${(props) => props.theme.header[props.category].textColor};
  margin-left: 20px;
  padding: 8px 20px;
  cursor: pointer;
`;

enum CATEGORIES {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  SKILLS = 'SKILLS',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT',
}
export interface IHeaderProps {
  category: 'profile' | 'skills' | 'projects' | 'contact' | 'login';
}

function Header({ category }: IHeaderProps) {
  const onButtonClick = (category: string) => {
    if (category === 'HOME') {
      navigate('/');
    } else {
      navigate(`/${category.toLowerCase()}`);
    }
  };

  return (
    <HeaderWrapper category={category}>
      <HomeButton
        category={category}
        onClick={() => onButtonClick(CATEGORIES.HOME)}
      >
        {CATEGORIES.HOME}
      </HomeButton>
      <Category>
        {category !== 'profile' && (
          <Button
            category={category}
            onClick={() => onButtonClick(CATEGORIES.PROFILE)}
          >
            {CATEGORIES.PROFILE}
          </Button>
        )}
        {category !== 'skills' && (
          <Button
            category={category}
            onClick={() => onButtonClick(CATEGORIES.SKILLS)}
          >
            {CATEGORIES.SKILLS}
          </Button>
        )}
        {category !== 'projects' && (
          <Button
            category={category}
            onClick={() => onButtonClick(CATEGORIES.PROJECTS)}
          >
            {CATEGORIES.PROJECTS}
          </Button>
        )}
        {category !== 'contact' && (
          <Button
            category={category}
            onClick={() => onButtonClick(CATEGORIES.CONTACT)}
          >
            {CATEGORIES.CONTACT}
          </Button>
        )}
      </Category>
    </HeaderWrapper>
  );
}

export default Header;
