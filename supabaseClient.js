import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qhynlkmtzsbyqsgqkteu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeW5sa210enNieXFzZ3FrdGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjk2NDgsImV4cCI6MjA5MzkwNTY0OH0.pFi6evAxi47m9iclyPDBWPOcL-PcSVfuvX1MxxmyPy0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
