import {
  Button,
  MainTitle,
  Save,
  Table,
  TableButton,
  Th,
} from '../../../pages/admin/AdminProfile.tsx';
import { Projects } from '../../../pages/admin/AdminProjects.tsx';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { queryClient } from '../../../index.tsx';
import { delProjects, getProjects, saveProjects } from '../../../util/api.ts';

export interface IProject {
  projectName: string;
  projectPeriodCnt: string;
  projectFrontSkills: string;
  projectBackSkills: string;
  projectPic: string;
  projectGithubPath: string;
  projectDeployPath: string;
  projectOrder: number;
}

function AdminProject() {
  const [projects, setProjects] = useState<IProject[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setProjects(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProjects,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProjects,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setProjects([
      ...projects,
      {
        projectName: '',
        projectPeriodCnt: '',
        projectFrontSkills: '',
        projectBackSkills: '',
        projectPic: '',
        projectGithubPath: '',
        projectDeployPath: '',
        projectOrder: -1,
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setProjects(projects.filter((project) => project.projectOrder !== index));

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        return { ...project, [label]: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const onProjectsSave = () => {
    mutate(projects);
  };

  return (
    <Projects>
      <MainTitle>프로젝트</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>프로젝트명</Th>
            <Th>기간/인원</Th>
            <Th>프론트</Th>
            <Th>백</Th>
            <Th>사진</Th>
            <Th>git</Th>
            <Th>배포</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={project.projectName}
                  onChange={(e) =>
                    onChange(index, 'projectName', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.projectPeriodCnt}
                  onChange={(e) =>
                    onChange(index, 'projectPeriodCnt', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.projectFrontSkills}
                  onChange={(e) =>
                    onChange(index, 'projectFrontSkills', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.projectBackSkills}
                  onChange={(e) =>
                    onChange(index, 'projectBackSkills', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.projectPic}
                  onChange={(e) =>
                    onChange(index, 'projectPic', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.projectGithubPath}
                  onChange={(e) =>
                    onChange(index, 'projectGithubPath', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.projectDeployPath}
                  onChange={(e) =>
                    onChange(index, 'projectDeployPath', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={project.projectOrder}
                  onChange={(e) =>
                    onChange(index, 'projectOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(project.projectOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onProjectsSave}>저장</Button>
      </Save>
    </Projects>
  );
}

export default AdminProject;
