import {
  Button,
  MainTitle,
  Save,
  TableButton,
  Th,
} from '../../../pages/admin/AdminProfile.tsx';
import { ISkills, Skills, Table } from '../../../pages/admin/AdminSkills.tsx';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { queryClient } from '../../../index.tsx';
import {
  delClientSkills,
  getClientSkills,
  saveClientSkills,
} from '../../../util/api.ts';

function AdminSkillsClient() {
  const [clientSkills, setClientSkills] = useState<ISkills[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['clientSkills'],
    queryFn: getClientSkills,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setClientSkills(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveClientSkills,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['clientSkills'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delClientSkills,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['clientSkills'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setClientSkills([...clientSkills, { skillsLogo: '', skillsOrder: -1 }]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setClientSkills(
      clientSkills.filter((skill) => skill.skillsOrder !== index),
    );

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedClientSkills = clientSkills.map((skill, i) => {
      if (i === index) {
        return { ...skill, [label]: value };
      }
      return skill;
    });
    setClientSkills(updatedClientSkills);
  };

  const onSkillsClientSave = () => {
    mutate(clientSkills);
  };

  return (
    <Skills>
      <MainTitle>CLIENT</MainTitle>
      <TableButton onClick={addRow}>+</TableButton>
      <Table>
        <thead>
          <tr>
            <Th>파일명</Th>
            <Th>정렬</Th>
            <Th>🗑</Th>
          </tr>
        </thead>
        <tbody>
          {clientSkills.map((client, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={client.skillsLogo}
                  onChange={(e) =>
                    onChange(index, 'skillsLogo', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={client.skillsOrder}
                  onChange={(e) =>
                    onChange(index, 'skillsOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(client.skillsOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onSkillsClientSave}>저장</Button>
      </Save>
    </Skills>
  );
}

export default AdminSkillsClient;
