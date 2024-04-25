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
  delToolSkills,
  getToolSkills,
  saveToolSkills,
} from '../../../util/api.ts';

function AdminSkillsTool() {
  const [tools, setTools] = useState<ISkills[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['toolSkills'],
    queryFn: getToolSkills,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setTools(data);
    }
  }, [data, isLoading]);

  const { mutate } = useMutation({
    mutationFn: saveToolSkills,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '저장에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['toolSkills'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '저장에 실패했습니다.',
      });
    },
  });

  const { mutate: delMutate } = useMutation({
    mutationFn: delToolSkills,
    onSuccess: () => {
      Swal.fire({
        title: '✅',
        text: '삭제에 성공했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['toolSkills'] });
    },
    onError: () => {
      Swal.fire({
        title: '❗',
        text: '삭제에 실패했습니다.',
      });
    },
  });

  const addRow = () => {
    setTools([...tools, { skillsLogo: '', skillsOrder: -1 }]);
  };

  const removeRow = (index: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setTools(tools.filter((skill) => skill.skillsOrder !== index));

    if (index > 0) {
      delMutate(index);
    }
  };

  const onChange = (index: number, label: string, value: string | number) => {
    const updatedTools = tools.map((tool, i) => {
      if (i === index) {
        return { ...tool, [label]: value };
      }
      return tool;
    });
    setTools(updatedTools);
  };

  const onSkillsToolSave = () => {
    mutate(tools);
  };

  return (
    <Skills>
      <MainTitle>TOOL</MainTitle>
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
          {tools.map((tool, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={tool.skillsLogo}
                  onChange={(e) =>
                    onChange(index, 'skillsLogo', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={tool.skillsOrder}
                  onChange={(e) =>
                    onChange(index, 'skillsOrder', e.target.value)
                  }
                />
              </td>
              <td>
                <TableButton onClick={() => removeRow(tool.skillsOrder)}>
                  -
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Save>
        <Button onClick={onSkillsToolSave}>저장</Button>
      </Save>
    </Skills>
  );
}

export default AdminSkillsTool;
