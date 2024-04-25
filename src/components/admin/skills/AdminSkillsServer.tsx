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
  delServerSkills,
  getServerSkills,
  saveServerSkills,
} from '../../../util/api.ts';

function AdminSkillsServer() {
  const [serverSkills, setServerSkills] = useState<ISkills[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['serverSkills'],
    queryFn: getServerSkills,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setServerSkills(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveServerSkills,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['serverSkills'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delServerSkills,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['serverSkills'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setServerSkills([...serverSkills, { skillsLogo: '', skillsOrder: -1 }]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setServerSkills(
      serverSkills.filter((skill) => skill.skillsOrder !== index),
    );

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedServerSkills = serverSkills.map((skill, i) => {
      if (i === index) {
        return { ...skill, [label]: value };
      }
      return skill;
    });
    setServerSkills(updatedServerSkills);
  };

  const onSkillsServerSave = () => {
    mutate(serverSkills);
  };

  return (
    <Skills>
      <MainTitle>SERVER</MainTitle>
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
          {serverSkills.map((server, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={server.skillsLogo}
                  onChange={(e) =>
                    onChange(index, 'skillsLogo', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={server.skillsOrder}
                  onChange={(e) =>
                    onChange(index, 'skillsOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(server.skillsOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onSkillsServerSave}>저장</Button>
      </Save>
    </Skills>
  );
}

export default AdminSkillsServer;
