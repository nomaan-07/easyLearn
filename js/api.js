import '../vendor/supabase/supabase-js@2.js';

const { createClient } = supabase;
const supabaseUrl = 'https://vqvbwalqiwdeyzuiltqm.supabase.co';
const supabasePublicAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmJ3YWxxaXdkZXl6dWlsdHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NTI0MTQsImV4cCI6MjAzNzEyODQxNH0.gx9vDTTyesP9rVv-AiqiY8f4v970X6lzHoQ4nBlacJQ';
const client = createClient(supabaseUrl, supabasePublicAPIKey);

async function getAllFromDatabase(tableName) {
  try {
    const result = await client.from(tableName).select();
    return result.data;
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }
}

async function getOneFromDatabase(tableName, key, value) {
  try {
    const result = await client.from(tableName).select().eq(key, value).single();
    return result.data;
  } catch (error) {
    console.error('Error getting data', error);
    throw error;
  }
}

async function addToDatabase(tableName, items) {
  try {
    await client.from(tableName).insert(items);
  } catch (error) {
    console.error('Error adding data', error);
    throw error;
  }
}

async function updateInDatabase(tableName, items, ID) {
  try {
    await client.from(tableName).update(items).eq('id', ID);
  } catch (error) {
    console.error('Error updating data', error);
    throw error;
  }
}

async function deleteFromDatabase(tableName, ID) {
  try {
    await client.from(tableName).delete().eq('id', ID);
  } catch (error) {
    console.error('Error deleting data', error);
    throw error;
  }
}

export { getAllFromDatabase, getOneFromDatabase, addToDatabase, updateInDatabase, deleteFromDatabase };
