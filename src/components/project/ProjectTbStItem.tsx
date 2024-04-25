import styled from 'styled-components';
import { IProjectProps } from './ProjectFnItem.tsx';
import { useQuery } from '@tanstack/react-query';
import { getProjectTbStItem } from '../../util/api.ts';
import { IProjectTbShooting } from '../admin/projects/AdminProjectTbShooting.tsx';

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

function ProjectTbStItem({ projectName }: IProjectProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['projectTbShooting', { projectName }],
    queryFn: ({ signal }) => getProjectTbStItem({ signal, projectName }),
  });

  return (
    <ul>
      {!isLoading &&
        data &&
        data.map((tbSt: IProjectTbShooting) => (
          <TroubleShootingBox key={tbSt.projectError}>
            <Trouble>❔ {tbSt.projectError}</Trouble>
            <Solution>❕ {tbSt.projectSolution}</Solution>
          </TroubleShootingBox>
        ))}
    </ul>
  );
}

export default ProjectTbStItem;
