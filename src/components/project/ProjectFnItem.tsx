import { Text } from './ProjectItem';
import { useQuery } from '@tanstack/react-query';
import { getProjectFnItem } from '../../util/api.ts';
import { IProjectFn } from '../admin/projects/AdminProjectFn.tsx';

export interface IProjectProps {
  projectName: string;
}

function ProjectFnItem({ projectName }: IProjectProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['projectFn', { projectName }],
    queryFn: ({ signal }) => getProjectFnItem({ signal, projectName }),
  });

  return (
    <ul>
      {!isLoading &&
        data &&
        data.map((projectFn: IProjectFn) => (
          <Text key={projectFn.projectFnTitle}>
            <div className="font-bold mg-b-5">{`<${projectFn.projectFnTitle}>`}</div>
            {projectFn.projectFnContent}
          </Text>
        ))}
    </ul>
  );
}

export default ProjectFnItem;
