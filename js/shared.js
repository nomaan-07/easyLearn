import database from './api.js';

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

async function getAllFromDataBase(tableName) {
  const { data, error } = await database.from(tableName).select();
  return data || error;
}

async function getCourseFromDatabase(courseID) {
  const { data, error } = await database.from('courses').select().eq('id', courseID).single();
  return data || error;
}

async function addCourseToDatabase(items) {
  const { error } = await database.from('courses').insert(course);
  return error;
}

async function updateCourseInDatabase(items, courseID) {
  const { error } = await database.from('courses').update(items).eq('id', courseID);
  return error;
}

async function deleteCourseFromDatabase(courseID) {
  const response = await database.from('courses').delete().eq('id', courseID);
  return response;
}

const removeLoader = () => {
  document.body.classList.remove('h-0');
  document.body.classList.remove('overflow-y-hidden');
  document.querySelector('.loader-wrapper').classList.add('hide');
};

export { removeLoader, generateRandomID, getAllFromDataBase, addCourseToDatabase, updateCourseInDatabase, deleteCourseFromDatabase };
