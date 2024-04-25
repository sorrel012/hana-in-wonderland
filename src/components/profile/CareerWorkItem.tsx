import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getProfileCareerWorkItem } from '../../util/api.ts';
import { ICareerWork } from '../admin/profile/AdminProfileCareerWork.tsx';

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

function CareerWorkItem({ careerProjectName }: IWorkItemProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['profileCareerWork', { careerProjectName }],
    queryFn: ({ signal }) =>
      getProfileCareerWorkItem({ signal, careerProjectName }),
  });

  return (
    <ul>
      {!isLoading &&
        data &&
        data.map((work: ICareerWork) => (
          <ProjectContent>- {work.careerWorkContent}</ProjectContent>
        ))}
    </ul>
  );
}

export default CareerWorkItem;
