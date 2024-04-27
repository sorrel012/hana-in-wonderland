import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IProjectProps } from './ProjectFnItem';
import { graphql, useStaticQuery } from 'gatsby';

const TroubleShootingBox = styled.li`
  font-size: 1.6vw;
  margin-top: 1.5%;
  line-height: 1.3;
  border: 2px solid ${(props) => props.theme.projects.wrapperBgColor};
  border-radius: 15px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Trouble = styled.div`
  margin-bottom: 1.5%;
`;

const Solution = styled.div``;

interface IProjectTbShootingData {
  name: string;
  error: { error: {} };
  solution: { solution: {} };
  order: number;
}

interface IProjectTbShooting {
  name: string;
  error: string;
  solution: string;
  order: number;
}

function ProjectTbStItem({ projectName }: IProjectProps) {
  const [tbShootings, setTbShootings] = useState<IProjectTbShooting[]>([]);

  const data = useStaticQuery(graphql`
    query TbShooting {
      allContentfulProjectTbShooting {
        edges {
          node {
            name
            error {
              error
            }
            solution {
              solution
            }
            order
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const tbShootings = data.allContentfulProjectTbShooting.edges.map(
        (tbShooting: { node: IProjectTbShootingData }) => ({
          ...tbShooting.node,
          error: tbShooting.node.error.error,
          solution: tbShooting.node.solution.solution,
        }),
      );
      const newTbShooting: IProjectTbShooting[] = tbShootings.filter(
        (tbShooting: IProjectTbShooting) => tbShooting.name === projectName,
      );
      newTbShooting.sort((a, b) => a.order - b.order);
      console.log(newTbShooting);
      setTbShootings(newTbShooting);
    }
  }, [data]);

  return (
    <ul>
      {tbShootings &&
        tbShootings.map((tbSt: IProjectTbShooting, index) => (
          <TroubleShootingBox key={index}>
            <Trouble>❔ {tbSt.error}</Trouble>
            <Solution>❕ {tbSt.solution}</Solution>
          </TroubleShootingBox>
        ))}
    </ul>
  );
}

export default ProjectTbStItem;
