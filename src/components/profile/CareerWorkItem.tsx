import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';

const ProjectContent = styled.li`
  padding-left: 2%;
  width: 100%;
  font-size: 1.2vw;
  margin-bottom: 7px;
  font-weight: bold;
`;

type DataProps = {
  allContentfulCareerWork: {
    edges: {
      node: {
        work: string[];
      };
    }[];
  };
};

const CareerWorkItem: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <ul>
      {data &&
        data.allContentfulCareerWork.edges.map(({ node }, index) => (
          <ProjectContent key={index}>- {node.work}</ProjectContent>
        ))}
    </ul>
  );
};

// function CareerWorkItem({ careerProjectName }: IWorkItemProps) {
//   return (
//     <ul>
//       {/*{data &&*/}
//       {/*  data.map((work: ICareerWork) => (*/}
//       {/*    <ProjectContent>- {work.careerWorkContent}</ProjectContent>*/}
//       {/*  ))}*/}
//     </ul>
//   );
// }

export default CareerWorkItem;
