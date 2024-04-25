import {
  Button,
  MainTitle,
  Profile,
  Save,
  Table,
  TableButton,
  Th,
} from '../../../pages/admin/AdminProfile.tsx';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { queryClient } from '../../../index.tsx';
import {
  delProfileEdu,
  getProfileEdu,
  saveProfileEdu,
} from '../../../util/api.ts';

export interface IEducation {
  eduPeriod: string;
  eduContent: string;
  eduCategory: string;
  eduOrder: number;
}

function AdminProfileEdu() {
  const [educations, setEducations] = useState<IEducation[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ['profileEdu'],
    queryFn: getProfileEdu,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setEducations(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveProfileEdu,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileEdu'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delProfileEdu,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['profileEdu'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setEducations([
      ...educations,
      { eduPeriod: '', eduContent: '', eduCategory: '', eduOrder: -1 },
    ]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    setEducations(
      educations.filter((education) => education.eduOrder !== index),
    );

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedEducations = educations.map((education, i) => {
      if (i === index) {
        return { ...education, [label]: value };
      }
      return education;
    });
    setEducations(updatedEducations);
  };

  const onEduSave = () => {
    mutate(educations);
  };

  return (
    <Profile>
      <MainTitle>교육</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>기간</Th>
            <Th>내용</Th>
            <Th>카테고리</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={education.eduPeriod}
                  onChange={(e) => onChange(index, 'eduPeriod', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={education.eduContent}
                  onChange={(e) =>
                    onChange(index, 'eduContent', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={education.eduCategory}
                  onChange={(e) =>
                    onChange(index, 'eduCategory', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={education.eduOrder}
                  onChange={(e) => onChange(index, 'eduOrder', e.target.value)}
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(education.eduOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onEduSave}>저장</Button>
      </Save>
    </Profile>
  );
}

export default AdminProfileEdu;
