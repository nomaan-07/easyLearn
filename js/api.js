import '../vendor/supabase/supabase-js@2.js';

const { createClient } = supabase;
const supabaseUrl = 'https://vqvbwalqiwdeyzuiltqm.supabase.co';
const supabasePublicAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmJ3YWxxaXdkZXl6dWlsdHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1NTI0MTQsImV4cCI6MjAzNzEyODQxNH0.gx9vDTTyesP9rVv-AiqiY8f4v970X6lzHoQ4nBlacJQ';
const client = createClient(supabaseUrl, supabasePublicAPIKey);

// const { error } = await client.from('courses').insert();
export default client;
