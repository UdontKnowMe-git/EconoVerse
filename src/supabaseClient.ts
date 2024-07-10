import { createClient } from '@supabase/supabase-js';
 
const supabaseUrl = 'https://qfgnpcglhanrgvjlanuf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZ25wY2dsaGFucmd2amxhbnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1OTYyODIsImV4cCI6MjAzNTE3MjI4Mn0.RZT83g7PuHwPgBT6c3O0sM50akpZ4e9CRW_za8t1aCA';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;