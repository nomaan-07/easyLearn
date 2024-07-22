import dataBase from './api.js';

const nowDate = () => {
  return new Date();
};

const generateRandomID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-';
  const charactersLength = characters.length;
  const randomStringLength = Math.floor(Math.random() * (78 - 7)) + 6;
  let result = `${nowDate().getTime() * 23}`;
  for (let i = 0; i < randomStringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += nowDate().getTime() * 24;
  return result;
};

async function getCourses() {
  const { data, error } = await dataBase.from('courses').select();
  return data;
}

async function addCourseToDataBase(items) {
  const { error } = await dataBase.from('courses').insert(course);
}

// let course = { id: generateRandomID(), created_at: nowDate(), name: 'test3', description: 'test', src: './fd', teacher: 'نعمان', students: 988, price: 456, discount: 34, category: 'test' };

// addCourseToDataBase(course);

// getCourses().then((res) => console.log(res));

export { generateRandomID, getCourses, addCourseToDataBase };
