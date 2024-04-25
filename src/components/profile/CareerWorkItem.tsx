import React from 'react';
import styled from 'styled-components';

const ProjectContent = styled.li`
  padding-left: 2%;
  width: 100%;
  font-size: 1.2vw;
  margin-bottom: 7px;
  font-weight: bold;
`;

interface IWorkItemProps {
  careerProjectName: string;
}

interface ICareerWork {
  work: string[];
}

function CareerWorkItem({ careerProjectName }: IWorkItemProps) {
  return (
    <ul>
      {/*{data &&*/}
      {/*  data.map((work: ICareerWork) => (*/}
      {/*    <ProjectContent>- {work.careerWorkContent}</ProjectContent>*/}
      {/*  ))}*/}
    </ul>
  );
}

export default CareerWorkItem;
