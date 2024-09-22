const PERMISSIONS: { [key: string]: string[] } = JSON.parse(
  localStorage.getItem('permissions') || '{}'
);

const ADMIN = localStorage.getItem('role') === 'Admin cấp 1';
const ADMIN2 = localStorage.getItem('role') === 'Admin cấp 2';
const OWNER = localStorage.getItem('role') === 'Chủ rừng';

const REPORT = PERMISSIONS['Báo cáo'] && PERMISSIONS['Báo cáo'].length > 0;
const COMPANY = PERMISSIONS['Công ty'] && PERMISSIONS['Công ty'].length > 0;
const PROFILE = PERMISSIONS['Hồ sơ'] && PERMISSIONS['Hồ sơ'].length > 0;

export { ADMIN, ADMIN2, OWNER, REPORT, COMPANY, PROFILE };
