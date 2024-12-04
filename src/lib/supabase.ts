import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://mxwoxfooprvzgeydioyc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14d294Zm9vcHJ2emdleWRpb3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NTk0MjEsImV4cCI6MjA0ODEzNTQyMX0.oGQgWfnbKD1Vx6eJ0GogaBCEqIN7e9gBp5GuG_A-Ib0';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);