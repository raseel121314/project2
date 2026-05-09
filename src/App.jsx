import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { 
  GraduationCap, 
  Radar, 
  AlertTriangle, 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  LogOut, 
  ChevronLeft,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react'
import './index.css'

// ═══════════════════════════════════════════════════════════════
// SUPABASE AUTH HELPER
// ═══════════════════════════════════════════════════════════════

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// ═══════════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════════

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message === 'Invalid login credentials' 
        ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
        : 'حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى')
      setLoading(false)
      return
    }

    if (data.user) {
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d5a87]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4a9fd4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1e3a5f] to-[#4a9fd4] rounded-3xl shadow-2xl mb-4 animate-float">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-[#1e3a5f] mb-2">EduPilot</h1>
          <p className="text-gray-500 text-lg">نحو مسار أكاديمي ذكي، استباقي، ومخصص</p>
        </div>

        {/* Login Card */}
        <div className="edupilot-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#2d5a87]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#2d5a87]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e3a5f]">تسجيل الدخول</h2>
              <p className="text-sm text-gray-400">أهلاً بك في نظام EduPilot</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@bu.edu.sa"
                  className="edupilot-input pr-12"
                  required
                  dir="ltr"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="edupilot-input pr-12"
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2d5a87] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                <XCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="edupilot-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  دخول النظام
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ليس لديك حساب؟{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-[#2d5a87] font-bold hover:underline"
              >
                إنشاء حساب جديد
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>جامعة الباحة © 2026</p>
          <p className="mt-1">نظام EduPilot - الرادار الاستباقي</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SIGN UP PAGE
// ═══════════════════════════════════════════════════════════════

function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: email.split('@')[0],
        }
      }
    })

    if (error) {
      setError(error.message === 'User already registered'
        ? 'هذا البريد الإلكتروني مسجل مسبقاً'
        : 'حدث خطأ أثناء إنشاء الحساب')
      setLoading(false)
      return
    }

    // Auto login after signup (no email confirmation needed)
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError('تم إنشاء الحساب بنجاح، لكن حدث خطأ في تسجيل الدخول التلقائي')
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      navigate('/dashboard')
    }, 1500)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d5a87]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4a9fd4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1e3a5f] to-[#4a9fd4] rounded-3xl shadow-2xl mb-4 animate-float">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-[#1e3a5f] mb-2">EduPilot</h1>
          <p className="text-gray-500 text-lg">نحو مسار أكاديمي ذكي، استباقي، ومخصص</p>
        </div>

        <div className="edupilot-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e3a5f]">إنشاء حساب جديد</h2>
              <p className="text-sm text-gray-400">انضم إلى نظام EduPilot الذكي</p>
            </div>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-600 mb-2">تم إنشاء الحساب بنجاح!</h3>
              <p className="text-gray-500">جاري تحويلك إلى لوحة التحكم...</p>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@bu.edu.sa"
                    className="edupilot-input pr-12"
                    required
                    dir="ltr"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="edupilot-input pr-12"
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2d5a87] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="edupilot-input"
                  required
                  dir="ltr"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="edupilot-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    إنشاء حساب
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              لديك حساب بالفعل؟{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-[#2d5a87] font-bold hover:underline"
              >
                تسجيل الدخول
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD PAGE - THE CORE OF EDUPILOT
// ═══════════════════════════════════════════════════════════════

function DashboardPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showRadarAlert, setShowRadarAlert] = useState(true)

  // Check for the critical bottleneck course
  const bottleneckCourse = courses.find(
    c => c.is_annual === true && c.name === 'تراكيب البيانات'
  )

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
      return
    }

    if (user) {
      fetchCourses()
    }
  }, [user, authLoading])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        throw error
      }

      setCourses(data || [])
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات المواد الدراسية. يرجى التحقق من الاتصال.')
      console.error('Error fetching courses:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#2d5a87] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">جاري التحقق من الجلسة...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e8f0fe] to-[#f5f7fa]">
      {/* ═══ HEADER ═══ */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#4a9fd4] rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#1e3a5f]">EduPilot</h1>
                <p className="text-xs text-gray-400 -mt-1">الرادار الاستباقي</p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-[#2d5a87]/10 px-4 py-2 rounded-xl">
                <User className="w-4 h-4 text-[#2d5a87]" />
                <span className="text-sm font-semibold text-[#1e3a5f]" dir="ltr">
                  {user.email}
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-semibold">خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-[#4a9fd4]" />
            <h2 className="text-2xl font-bold text-[#1e3a5f]">
              أهلاً بك، <span className="text-[#4a9fd4]">{user.email?.split('@')[0] || 'طالب'}</span>!
            </h2>
          </div>
          <p className="text-gray-500 mr-9">مسارك الأكاديمي محسّن بنسبة 95% للتخرج</p>
        </div>

        {/* ═══ RADAR ALERT - THE CORE FEATURE ═══ */}
        {bottleneckCourse && showRadarAlert && (
          <div className="radar-alert mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-shimmer" />
            <div className="relative flex items-start gap-4">
              <div className="radar-icon flex-shrink-0">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <Radar className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-lg font-black">تنبيه الرادار الاستباقي</h3>
                </div>
                <p className="text-white/95 text-base leading-relaxed font-semibold">
                  مادة <span className="font-black underline decoration-2">تراكيب البيانات</span> مادة سنوية، 
                  عدم تسجيلك لها في ترم الخريف الحالي يعني <span className="font-black text-yellow-200">تأخر تخرجك سنة كاملة!</span>
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <Zap className="w-4 h-4" />
                  <span>الإجراء المستحسن: سجّل الآن قبل إغلاق التسجيل</span>
                </div>
              </div>
              <button 
                onClick={() => setShowRadarAlert(false)}
                className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="edupilot-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2d5a87]/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#2d5a87]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#1e3a5f]">{courses.length}</p>
              <p className="text-sm text-gray-500">المقررات المتاحة</p>
            </div>
          </div>

          <div className="edupilot-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#1e3a5f]">
                {courses.filter(c => c.is_annual).length}
              </p>
              <p className="text-sm text-gray-500">مواد سنوية</p>
            </div>
          </div>

          <div className="edupilot-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#1e3a5f]">95%</p>
              <p className="text-sm text-gray-500">مُحسّن للتخرج</p>
            </div>
          </div>
        </div>

        {/* ═══ COURSES SECTION ═══ */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2d5a87] to-[#4a9fd4] rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a5f]">المقررات الدراسية</h3>
              <p className="text-sm text-gray-400">قائمة المواد المتاحة للتسجيل</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="course-card animate-pulse">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-3" />
                <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-600 mb-2">خطأ في تحميل البيانات</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchCourses}
              className="edupilot-btn-secondary"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className={`course-card relative overflow-hidden ${
                  course.is_annual && course.name === 'تراكيب البيانات' 
                    ? 'ring-2 ring-red-400 shadow-red-100' 
                    : ''
                }`}
              >
                {/* Annual course highlight */}
                {course.is_annual && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a87]/10 to-[#4a9fd4]/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#2d5a87]" />
                  </div>
                  {course.is_annual ? (
                    <span className="annual-badge flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      سنوية
                    </span>
                  ) : (
                    <span className="semester-badge flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      فصلية
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-[#1e3a5f] mb-2">{course.name}</h4>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>الترم المتاح: <span className="font-semibold text-[#2d5a87]">{course.semester || 'غير محدد'}</span></span>
                </div>

                {course.is_annual && course.name === 'تراكيب البيانات' && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                    <Radar className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-red-600 font-semibold">تنبيه: مادة حرجة!</span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">كود المادة: {course.code || '---'}</span>
                  <button className="flex items-center gap-1 text-sm text-[#2d5a87] font-semibold hover:text-[#1e3a5f] transition-colors">
                    التفاصيل
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد مقررات</h3>
            <p className="text-gray-400">لم يتم العثور على أي مواد في قاعدة البيانات</p>
          </div>
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#2d5a87]" />
              <span className="text-sm font-semibold text-[#1e3a5f]">EduPilot</span>
              <span className="text-sm text-gray-400">| جامعة الباحة © 2026</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Radar className="w-4 h-4" />
              <span>نظام الرادار الاستباقي للمتابعة الأكاديمية</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PROTECTED ROUTE WRAPPER
// ═══════════════════════════════════════════════════════════════

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#2d5a87] animate-spin" />
      </div>
    )
  }

  return user ? children : null
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
