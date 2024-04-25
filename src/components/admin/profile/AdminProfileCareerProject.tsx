import { useEffect, useState } from 'react';
import {
  Button,
  MainTitle,
  Profile,
  Save,
  Table,
  TableButton,
  Th,
} from '../../../pages/admin/AdminProfile.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { queryClient } from '../../../index.tsx';
import {
  delProfileCareerProject,
  getProfileCareerProject,
  saveProfileCareerProject,
} from '../../../util/api.ts';

export interface ICareerProject {
  careerCompany: string;
  careerProjectName: string;
  careerProjectOrder: number;
}

function AdminProfileCareerProject() {
  const [careerProject, setCareerProject] = useState<ICareerProject[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['profileCareerProject'],
    queryFn: getProfileCareerProject,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setCareerProject(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProfileCareerProject,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileCareerProject'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProfileCareerProject,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileCareerProject'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setCareerProject([
      ...careerProject,
      { careerCompany: '', careerProjectName: '', careerProjectOrder: 1 },
    ]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setCareerProject(
      careerProject.filter((project) => project.careerProjectOrder !== index),
    );

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedCareerProject = careerProject.map((project, i) => {
      if (i === index) {
        return { ...project, [label]: value };
      }
      return project;
    });
    setCareerProject(updatedCareerProject);
  };

  const onCareerProjectSave = () => {
    mutate(careerProject);
  };

  return (
    <Profile>
      <MainTitle>회사 프로젝트</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>회사명</Th>
            <Th>프로젝트명</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {careerProject.map((project, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={project.careerCompany}
                  onChange={(e) =>
                    onChange(index, 'careerCompany', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={project.careerProjectName}
                  onChange={(e) =>
                    onChange(index, 'careerProjectName', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={project.careerProjectOrder}
                  onChange={(e) =>
                    onChange(index, 'careerProjectOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton
                  onClick={() => removeRow(project.careerProjectOrder)}
                >
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onCareerProjectSave}>저장</Button>
      </Save>
    </Profile>
  );
}

export default AdminProfileCareerProject;
