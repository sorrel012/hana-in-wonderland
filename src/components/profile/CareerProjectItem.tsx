import React from 'react';
import styled from 'styled-components';
import CareerWorkItem from './CareerWorkItem';

const ProjectName = styled.h2`
  font-size: 1.5vw;
  margin-bottom: 10px;
  font-weight: bold;
`;

interface IProjectItemProps {
  project: string[];
}

function CareerProjectItem({ project }: IProjectItemProps) {
  return (
    <>
      {project.map((project: string) => (
        <>
          <ProjectName>◽ {project}</ProjectName>
          <CareerWorkItem {...{ careerProjectName: project }} />
        </>
      ))}
    </>
  );
}

export default CareerProjectItem;
