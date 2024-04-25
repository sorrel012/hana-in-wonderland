import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ProjectName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  white-space: pre-line;
  line-height: 1.5;
  h2 {
    font-size: 1.6vw;
  }
  h3 {
    font-size: 1.5vw;
    margin-top: 1%;
    padding-left: 2%;
  }
`;

interface IProjectItemProps {
  companyName: string;
}

function CareerProjectItem({ companyName }: IProjectItemProps) {
  const [projects, setProjects] = useState<any[]>([]);

  const { allContentfulCareerProject } = useStaticQuery(graphql`
    query CareerWork {
      allContentfulCareerProject {
        edges {
          node {
            company
            project {
              raw
            }
            order
          }
        }
      }
    }
  `);

  useEffect(() => {
    let newWorks: any[] = [];
    allContentfulCareerProject.edges.forEach((work: any) => {
      const { company, project } = work.node;
      if (company === companyName) {
        newWorks.push({ project: project.raw, order: project.order });
      }
    });
    newWorks.sort((a, b) => b.order - a.order);
    setProjects(newWorks);
  }, [allContentfulCareerProject]);

  return (
    <>
      {projects?.map((project, index) => (
        <ProjectName key={index}>
          {documentToReactComponents(JSON.parse(project.project))}
        </ProjectName>
      ))}
    </>
  );
}

export default CareerProjectItem;
