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
  delProjectFn,
  getProjectFn,
  saveProjectFn,
} from '../../../util/api.ts';

export interface IProjectFn {
  projectName: string;
  projectFnTitle: string;
  projectFnContent: string;
  projectFnOrder: number;
}

function AdminProjectFn() {
  const [projectFns, setProjectFns] = useState<IProjectFn[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['projectFn'],
    queryFn: getProjectFn,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setProjectFns(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProjectFn,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['projectFn'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProjectFn,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['projectFn'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setProjectFns([
      ...projectFns,
      {
        projectName: '',
        projectFnTitle: '',
        projectFnContent: '',
        projectFnOrder: -1,
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setProjectFns(projectFns.filter((fn) => fn.projectFnOrder !== index));

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedProjectFns = projectFns.map((fn, i) => {
      if (i === index) {
        return { ...fn, [label]: value };
      }
      return fn;
    });
    setProjectFns(updatedProjectFns);
  };

  const onProjectFnSave = () => {
    mutate(projectFns);
  };

  return (
    <Projects>
      <MainTitle>프로젝트 기능</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>프로젝트명</Th>
            <Th>부제</Th>
            <Th>기능</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {projectFns.map((fn, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={fn.projectName}
                  onChange={(e) =>
                    onChange(index, 'projectName', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={fn.projectFnTitle}
                  onChange={(e) =>
                    onChange(index, 'projectFnTitle', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={fn.projectFnContent}
                  onChange={(e) =>
                    onChange(index, 'projectFnContent', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={fn.projectFnOrder}
                  onChange={(e) =>
                    onChange(index, 'projectFnOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(fn.projectFnOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onProjectFnSave}>저장</Button>
      </Save>
    </Projects>
  );
}

export default AdminProjectFn;
