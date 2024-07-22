import database from './api.js';

const generateRandomID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-';
  const charactersLength = characters.length;
  const randomStringLength = Math.floor(Math.random() * (78 - 7)) + 6;
  let result = `${new Date().getTime() * 23}`;
  for (let i = 0; i < randomStringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += new Date().getTime() * 24;
  return result;
};

async function getAllFromDatabase(tableName) {
  const { data, error } = await database.from(tableName).select();
  if (error) {
    console.error('Error getting data', error);
    return error;
  }
  return data;
}

async function getOneFromDatabase(tableName, ID) {
  const { data, error } = await database.from(tableName).select().eq('id', ID).single();
  if (error) {
    console.error('Error getting data', error);
    return error;
  }
  return data;
}

async function addToDatabase(tableName, items) {
  const { error } = await database.from(tableName).insert(items);
  if (error) {
    console.error('Error adding data', error);
  }
  return null;
}

async function updateInDatabase(tableName, items, ID) {
  const { error } = await database.from(tableName).update(items).eq('id', ID);
  if (error) {
    console.error('Error updating data', error);
  }
  return null;
}

async function deleteFromDatabase(tableName, ID) {
  const { error } = await database.from(tableName).delete().eq('id', ID);
  if (error) {
    console.error('Error deleting data', error);
    return error;
  }
  return null;
}

const removeLoader = () => {
  document.body.classList.remove('h-0');
  document.body.classList.remove('overflow-y-hidden');
  document.querySelector('.loader-wrapper').classList.add('hide');
};

export { removeLoader, generateRandomID, getAllFromDatabase, addToDatabase, updateInDatabase, deleteFromDatabase };
