import styled from 'styled-components';
import { getProfileCareerProjectItem } from '../../util/api.ts';
import { useQuery } from '@tanstack/react-query';
import { ICareerProject } from '../admin/profile/AdminProfileCareerProject.tsx';
import CareerWorkItem from './CareerWorkItem.tsx';

const ProjectName = styled.h2`
  font-size: 1.5vw;
  margin-bottom: 10px;
  font-weight: bold;
`;

interface IProjectItemProps {
  company: string;
}

function CareerProjectItem({ company }: IProjectItemProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['profileCareerProject', { company }],
    queryFn: ({ signal }) => getProfileCareerProjectItem({ signal, company }),
  });

  return (
    <>
      {!isLoading &&
        data &&
        data.map((project: ICareerProject) => (
          <>
            <ProjectName>◽ {project.careerProjectName}</ProjectName>
            <CareerWorkItem
              {...{ careerProjectName: project.careerProjectName }}
            />
          </>
        ))}
    </>
  );
}

export default CareerProjectItem;
