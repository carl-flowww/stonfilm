// ==========================================
// Supabase Configuration
// ==========================================

// ⚠️ TODO: Supabase Dashboard에서 실제 값으로 교체하세요
// Settings > API > Project URL, anon public key

const SUPABASE_URL = 'https://fhaulipfxghmgmoytleh.supabase.co/'; // 예: 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoYXVsaXBmeGdobWdtb3l0bGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTUwNDMsImV4cCI6MjA3NjA5MTA0M30.alHoY8fwarSJFVxg-5RNrX4g_4BNSKJDvNLU5mk2b0k'; // 예: 'eyJhbGci...'

// Supabase 클라이언트 초기화
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export (ES6 모듈로 사용할 경우)
// export { supabase };
