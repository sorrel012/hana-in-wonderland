import React from 'react';
import styled from 'styled-components';

import line from '../../assets/images/projects/line.png';
import finish from '../../assets/images/projects/finish.png';
import ProjectItem from './ProjectItem';

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const Title = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.projects.wrapperBgColor};
`;

const RaceImg = styled.img`
  width: 100%;
  display: block;
`;

const TitleHeader = styled.h2`
  color: ${(props) => props.theme.projects.headerTextColor};
  background-color: ${(props) => props.theme.projects.headerBgColor};
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 3vw;
  font-weight: bolder;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  background: ${(props) => props.theme.projects.wrapperBgColor};
  padding: 50px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Flag = styled.img`
  position: absolute;
  bottom: 0;
  right: -1%;
  width: 10%;
`;

function Project() {
  return (
    <Wrapper>
      <Title>
        <RaceImg src={line} alt="line" />
        <TitleHeader>PROJECTS</TitleHeader>
      </Title>
      <Content>
        <ProjectItem />
        <Flag src={finish} alt="finish" />
      </Content>
      <RaceImg src={line} alt="line" />
    </Wrapper>
  );
}

export default Project;
