-- ═══════════════════════════════════════════════════════════════
-- EduPilot - Supabase Database Setup
-- جامعة الباحة - هاكاثون 2026
-- ═══════════════════════════════════════════════════════════════

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_annual BOOLEAN DEFAULT false,
    semester TEXT,
    code TEXT,
    credits INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read
CREATE POLICY "Allow authenticated read" ON public.courses
    FOR SELECT TO authenticated USING (true);

-- Insert sample data (Saudi university courses)
INSERT INTO public.courses (name, is_annual, semester, code, credits) VALUES
    ('تراكيب البيانات', true, 'الخريف', 'CS301', 3),
    ('تحليل وتصميم الخوارزميات', false, 'الربيع', 'CS302', 3),
    ('قواعد البيانات', false, 'الخريف', 'CS303', 3),
    ('برمجة الويب', false, 'الربيع', 'CS304', 3),
    ('الذكاء الاصطناعي', false, 'الخريف', 'CS305', 3),
    ('أمن المعلومات', true, 'الخريف', 'CS306', 3),
    ('هندسة البرمجيات', false, 'الربيع', 'CS307', 3),
    ('شبكات الحاسب', false, 'الخريف', 'CS308', 3),
    ('نظم التشغيل', true, 'الربيع', 'CS309', 3),
    ('تعلم الآلة', false, 'الربيع', 'CS310', 3)
ON CONFLICT DO NOTHING;

-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    student_id TEXT,
    major TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
