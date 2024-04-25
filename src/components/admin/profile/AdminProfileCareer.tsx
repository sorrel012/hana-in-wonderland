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
  delProfileCareer,
  getProfileCareer,
  saveProfileCareer,
} from '../../../util/api.ts';

export interface ICareer {
  careerCompany: string;
  careerPeriod: string;
  careerOrder: number;
}

function AdminProfileCareer() {
  const [career, setCareer] = useState<ICareer[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['profileCareer'],
    queryFn: getProfileCareer,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setCareer(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProfileCareer,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileCareer'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProfileCareer,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileCareer'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setCareer([
      ...career,
      { careerCompany: '', careerPeriod: '', careerOrder: 1 },
    ]);
  };
  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setCareer(career.filter((career) => career.careerOrder !== index));

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedCareer = career.map((career, i) => {
      if (i === index) {
        return { ...career, [label]: value };
      }
      return career;
    });
    setCareer(updatedCareer);
  };

  const onCareerSave = () => {
    mutate(career);
  };

  return (
    <Profile>
      <MainTitle>경력</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>회사명</Th>
            <Th>기간</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {career.map((career, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={career.careerCompany}
                  onChange={(e) =>
                    onChange(index, 'careerCompany', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={career.careerPeriod}
                  onChange={(e) =>
                    onChange(index, 'careerPeriod', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={career.careerOrder}
                  onChange={(e) =>
                    onChange(index, 'careerOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(career.careerOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onCareerSave}>저장</Button>
      </Save>
    </Profile>
  );
}

export default AdminProfileCareer;
