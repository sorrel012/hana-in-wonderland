import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

const Text = styled.div`
  margin-top: 3%;
  font-size: 1.6vw;
`;

export interface IProjectProps {
  projectName: string;
}

interface IProjectData {
  name: string;
  title: string;
  content: { content: {} };
  order: number;
}

interface IProjectFn {
  name: string;
  title: string;
  content: string;
  order: number;
}

function ProjectFnItem({ projectName }: IProjectProps) {
  const [projectFunctions, setProjectFunctions] = useState<IProjectFn[]>([]);

  const data = useStaticQuery(graphql`
    query ProjectFn {
      allContentfulProjectFunction {
        edges {
          node {
            name
            title
            content {
              content
            }
            order
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const functions = data.allContentfulProjectFunction.edges.map(
        (fn: { node: IProjectData }) => ({
          ...fn.node,
          content: fn.node.content.content,
        }),
      );
      const newFn: IProjectFn[] = functions.filter(
        (fn: IProjectFn) => fn.name === projectName,
      );
      newFn.sort((a, b) => a.order - b.order);
      setProjectFunctions(newFn);
    }
  }, [data]);

  return (
    <ul>
      {projectFunctions &&
        projectFunctions.map((projectFn: IProjectFn) => (
          <Text key={projectFn.title}>
            <div className="font-bold mg-b-5">{`<${projectFn.title}>`}</div>
            {projectFn.content}
          </Text>
        ))}
    </ul>
  );
}

export default ProjectFnItem;
