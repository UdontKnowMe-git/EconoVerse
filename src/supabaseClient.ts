import { createClient } from '@supabase/supabase-js';
 
const supabaseUrl = 'https://qfgnpcglhanrgvjlanuf.supabase.co';
const supabaseKey = 'deez nuts';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
