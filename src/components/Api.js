import { saveMenuToApi, fetchCurrentMenu } from '../data/uploadMenu';

export const saveData = async (key, value, signal) => {
  try {
    if (key !== 'menu') {
      throw new Error('Invalid key for saving menu data');
    }
    return await saveMenuToApi(value, signal);
  } catch (err) {
    console.error('Error in saveData:', err);
    return false; // ส่งกลับ false เพื่อให้เรียกใช้งานจัดการข้อผิดพลาดได้
  }
};

export const loadData = async (key, signal) => {
  try {
    if (key !== 'menu') {
      throw new Error('Invalid key for loading menu data');
    }
    return await fetchCurrentMenu(signal);
  } catch (err) {
    console.error('Error in loadData:', err);
    return []; // ส่งกลับ array ว่างเพื่อป้องกันหน้าเว็บหยุดทำงาน
  }
};
