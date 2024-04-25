import { useEffect, useState } from 'react';
import {
  Button,
  MainTitle,
  Save,
  Table,
  TableButton,
  Th,
} from '../../../pages/admin/AdminProfile.tsx';
import { Projects } from '../../../pages/admin/AdminProjects.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { queryClient } from '../../../index.tsx';
import {
  delProjectTbShooting,
  getProjectTbShooting,
  saveProjectTbShooting,
} from '../../../util/api.ts';

export interface IProjectTbShooting {
  projectName: string;
  projectError: string;
  projectSolution: string;
  projectTbOrder: number;
}

function AdminProjectTbShooting() {
  const [projectTbShootings, setProjectTbShootings] = useState<
    IProjectTbShooting[]
  >([]);

  const { data, isLoading } = useQuery({
    queryKey: ['projectTbShooting'],
    queryFn: getProjectTbShooting,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setProjectTbShootings(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProjectTbShooting,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['projectTbShooting'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProjectTbShooting,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['projectTbShooting'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setProjectTbShootings([
      ...projectTbShootings,
      {
        projectName: '',
        projectError: '',
        projectSolution: '',
        projectTbOrder: -1,
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    setProjectTbShootings(
      projectTbShootings.filter(
        (tbShooting) => tbShooting.projectTbOrder !== index,
      ),
    );

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedProjectTbShootings = projectTbShootings.map(
      (tbShooting, i) => {
        if (i === index) {
          return { ...tbShooting, [label]: value };
        }
        return tbShooting;
      },
    );
    setProjectTbShootings(updatedProjectTbShootings);
  };

  const onProjectTbShootingSave = () => {
    mutate(projectTbShootings);
  };

  return (
    <Projects>
      <MainTitle>프로젝트 트러블 슈팅</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>프로젝트명</Th>
            <Th>에러</Th>
            <Th>해결</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {projectTbShootings.map((tbShooting, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={tbShooting.projectName}
                  onChange={(e) =>
                    onChange(index, 'projectName', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={tbShooting.projectError}
                  onChange={(e) =>
                    onChange(index, 'projectError', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={tbShooting.projectSolution}
                  onChange={(e) =>
                    onChange(index, 'projectSolution', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={tbShooting.projectTbOrder}
                  onChange={(e) =>
                    onChange(index, 'projectTbOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton
                  onClick={() => removeRow(tbShooting.projectTbOrder)}
                >
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onProjectTbShootingSave}>저장</Button>
      </Save>
    </Projects>
  );
}

export default AdminProjectTbShooting;
