import axios from 'axios';
import { ICertification } from '../components/admin/profile/AdminProfileCert.tsx';
import { IEducation } from '../components/admin/profile/AdminProfileEdu.tsx';
import { ICareer } from '../components/admin/profile/AdminProfileCareer.tsx';
import { ICareerProject } from '../components/admin/profile/AdminProfileCareerProject.tsx';
import { ICareerWork } from '../components/admin/profile/AdminProfileCareerWork.tsx';
import { ISkills } from '../pages/admin/AdminSkills.tsx';
import { IProject } from '../components/admin/projects/AdminProject.tsx';
import { IProjectFn } from '../components/admin/projects/AdminProjectFn.tsx';
import { IProjectTbShooting } from '../components/admin/projects/AdminProjectTbShooting.tsx';
import { IContactProps } from '../pages/Contact.tsx';

const apiUrl = import.meta.env.VITE_API_URL;

export interface IProfileInfo {
  name: string | undefined;
  mainPic: string | undefined;
  title: string | undefined;
  content: string | undefined;
  subPic: string | undefined;
  birth: string | undefined;
  email: string | undefined;
  address: string | undefined;
}

export async function getProfileInfo() {
  const { data } = await axios.get(`${apiUrl}/profile/info`);
  return data.result;
}

export async function saveProfileInfo(profileInfo: IProfileInfo) {
  const { data } = await axios.post(`${apiUrl}/profile/info`, profileInfo);
  return data;
}

export async function editProfileInfo(profileInfo: IProfileInfo) {
  const { data } = await axios.put(`${apiUrl}/profile/info`, profileInfo);
  return data;
}

export async function getProfileCert() {
  const { data } = await axios.get(`${apiUrl}/profile/cert`);
  return data.result;
}

export async function saveProfileCert(certs: ICertification[]) {
  const { data } = await axios.post(`${apiUrl}/profile/cert`, certs);
  return data;
}

export async function delProfileCert(index: number) {
  const { data } = await axios.delete(`${apiUrl}/profile/cert`, {
    params: { certOrder: index },
  });
  return data;
}

export async function getProfileEdu() {
  const { data } = await axios.get(`${apiUrl}/profile/edu`);
  return data.result;
}

export async function saveProfileEdu(educations: IEducation[]) {
  const { data } = await axios.post(`${apiUrl}/profile/edu`, educations);
  return data;
}

export async function delProfileEdu(index: number) {
  const { data } = await axios.delete(`${apiUrl}/profile/edu`, {
    params: { eduOrder: index },
  });
  return data;
}

export async function getProfileCareer() {
  const { data } = await axios.get(`${apiUrl}/profile/career`);
  return data.result;
}

export async function saveProfileCareer(careers: ICareer[]) {
  const { data } = await axios.post(`${apiUrl}/profile/career`, careers);
  return data;
}

export async function delProfileCareer(index: number) {
  const { data } = await axios.delete(`${apiUrl}/profile/career`, {
    params: { careerOrder: index },
  });
  return data;
}

export async function getProfileCareerProject() {
  const { data } = await axios.get(`${apiUrl}/profile/career-project`);
  return data.result;
}

export async function saveProfileCareerProject(
  careerProjects: ICareerProject[],
) {
  const { data } = await axios.post(
    `${apiUrl}/profile/career-project`,
    careerProjects,
  );
  return data;
}

export async function delProfileCareerProject(index: number) {
  const { data } = await axios.delete(`${apiUrl}/profile/career-project`, {
    params: { careerProjectOrder: index },
  });
  return data;
}

interface ICareerProjectRqst {
  signal: AbortSignal;
  company: string;
}

export async function getProfileCareerProjectItem({
  signal,
  company,
}: ICareerProjectRqst) {
  const config = {
    signal,
  };

  const { data } = await axios.get(
    `${apiUrl}/profile/career-project/${company}`,
    config,
  );
  return data.result;
}

export async function getProfileCareerWork() {
  const { data } = await axios.get(`${apiUrl}/profile/career-work`);
  return data.result;
}

export async function saveProfileCareerWork(careerWorks: ICareerWork[]) {
  const { data } = await axios.post(
    `${apiUrl}/profile/career-work`,
    careerWorks,
  );
  return data;
}

export async function delProfileCareerWork(index: number) {
  const { data } = await axios.delete(`${apiUrl}/profile/career-work`, {
    params: { careerWorkOrder: index },
  });
  return data;
}

interface ICareerWorkRqst {
  signal: AbortSignal;
  careerProjectName: string;
}

export async function getProfileCareerWorkItem({
  signal,
  careerProjectName,
}: ICareerWorkRqst) {
  const config = {
    signal,
  };

  const { data } = await axios.get(
    `${apiUrl}/profile/career-work/${careerProjectName}`,
    config,
  );
  return data.result;
}

export async function getClientSkills() {
  const { data } = await axios.get(`${apiUrl}/skills/client`);
  return data.result;
}

export async function saveClientSkills(clientSkills: ISkills[]) {
  const { data } = await axios.post(`${apiUrl}/skills/client`, clientSkills);
  return data;
}

export async function delClientSkills(index: number) {
  const { data } = await axios.delete(`${apiUrl}/skills/client`, {
    params: { fileOrder: index },
  });
  return data;
}

export async function getServerSkills() {
  const { data } = await axios.get(`${apiUrl}/skills/server`);
  return data.result;
}

export async function saveServerSkills(serverSkills: ISkills[]) {
  const { data } = await axios.post(`${apiUrl}/skills/server`, serverSkills);
  return data;
}

export async function delServerSkills(index: number) {
  const { data } = await axios.delete(`${apiUrl}/skills/server`, {
    params: { fileOrder: index },
  });
  return data;
}

export async function getToolSkills() {
  const { data } = await axios.get(`${apiUrl}/skills/tool`);
  return data.result;
}

export async function saveToolSkills(tools: ISkills[]) {
  const { data } = await axios.post(`${apiUrl}/skills/tool`, tools);
  return data;
}

export async function delToolSkills(index: number) {
  const { data } = await axios.delete(`${apiUrl}/skills/tool`, {
    params: { skillsOrder: index },
  });
  return data;
}

export async function getProjects() {
  const { data } = await axios.get(`${apiUrl}/projects/project`);
  return data.result;
}

export async function saveProjects(projects: IProject[]) {
  const { data } = await axios.post(`${apiUrl}/projects/project`, projects);
  return data;
}

export async function delProjects(index: number) {
  const { data } = await axios.delete(`${apiUrl}/projects/project`, {
    params: { projectOrder: index },
  });
  return data;
}

export async function getProjectFn() {
  const { data } = await axios.get(`${apiUrl}/projects/fn`);
  return data.result;
}

export async function saveProjectFn(projectFns: IProjectFn[]) {
  const { data } = await axios.post(`${apiUrl}/projects/fn`, projectFns);
  return data;
}

export async function delProjectFn(index: number) {
  const { data } = await axios.delete(`${apiUrl}/projects/fn`, {
    params: { projectFnOrder: index },
  });
  return data;
}

interface IProjectItem {
  signal: AbortSignal;
  projectName: string;
}

export async function getProjectFnItem({ signal, projectName }: IProjectItem) {
  const config = {
    signal,
  };

  const { data } = await axios.get(
    `${apiUrl}/projects/fn/${projectName}`,
    config,
  );
  return data.result;
}

export async function getProjectTbShooting() {
  const { data } = await axios.get(`${apiUrl}/projects/tb-shooting`);
  return data.result;
}

export async function saveProjectTbShooting(
  projectTbShootings: IProjectTbShooting[],
) {
  const { data } = await axios.post(
    `${apiUrl}/projects/tb-shooting`,
    projectTbShootings,
  );
  return data;
}

export async function delProjectTbShooting(index: number) {
  const { data } = await axios.delete(`${apiUrl}/projects/tb-shooting`, {
    params: { projectTbOrder: index },
  });
  return data;
}

export async function getProjectTbStItem({
  signal,
  projectName,
}: IProjectItem) {
  const config = {
    signal,
  };

  const { data } = await axios.get(
    `${apiUrl}/projects/tb-shooting/${projectName}`,
    config,
  );
  return data.result;
}

export async function getContact() {
  const { data } = await axios.get(`${apiUrl}/contact`);
  return data.result;
}

export async function saveContact(contact: IContactProps) {
  const { data } = await axios.post(`${apiUrl}/contact`, contact);
  return data;
}
