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
  delProfileCareerWork,
  getProfileCareerWork,
  saveProfileCareerWork,
} from '../../../util/api.ts';

export interface ICareerWork {
  careerProjectName: string;
  careerWorkContent: string;
  careerWorkOrder: number;
}

function AdminProfileCareerWork() {
  const [careerWork, setCareerWork] = useState<ICareerWork[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['profileCareerWork'],
    queryFn: getProfileCareerWork,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setCareerWork(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProfileCareerWork,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileCareerWork'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProfileCareerWork,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileCareerWork'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setCareerWork([
      ...careerWork,
      { careerProjectName: '', careerWorkContent: '', careerWorkOrder: -1 },
    ]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setCareerWork(careerWork.filter((work) => work.careerWorkOrder !== index));

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedCareerWork = careerWork.map((work, i) => {
      if (i === index) {
        return { ...work, [label]: value };
      }
      return work;
    });
    setCareerWork(updatedCareerWork);
  };

  const onCareerWorkSave = () => {
    mutate(careerWork);
  };

  return (
    <Profile>
      <MainTitle>업무</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>프로젝트명</Th>
            <Th>업무내용</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {careerWork.map((work, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={work.careerProjectName}
                  onChange={(e) =>
                    onChange(index, 'careerProjectName', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={work.careerWorkContent}
                  onChange={(e) =>
                    onChange(index, 'careerWorkContent', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={work.careerWorkOrder}
                  onChange={(e) =>
                    onChange(index, 'careerWorkOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(work.careerWorkOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onCareerWorkSave}>저장</Button>
      </Save>
    </Profile>
  );
}

export default AdminProfileCareerWork;
