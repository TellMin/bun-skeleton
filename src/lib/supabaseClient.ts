import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
