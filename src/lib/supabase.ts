import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const appEnvironment = import.meta.env.VITE_APP_ENV?.trim();
const isProductionDatabase =
  Boolean(supabaseUrl) && supabaseUrl!.includes("osganvzmjisqsomjayyt.supabase.co");

// Experimental deploy previews must never read from or write to the live database.
// Configure VITE_APP_ENV=experimental for deploy-preview builds; add a dedicated
// Supabase project URL/key before enabling backend features in that environment.
const previewHostname =
  typeof window !== "undefined" &&
  (window.location.hostname.endsWith(".vercel.app") ||
    window.location.hostname.endsWith(".netlify.app") ||
    window.location.hostname.endsWith(".freebuff.page"));

const isBlockedExperimentalConnection =
  isProductionDatabase &&
  (appEnvironment === "experimental" || previewHostname);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !isBlockedExperimentalConnection,
);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (isBlockedExperimentalConnection) {
    throw new Error("قاعدة بيانات الإنتاج محظورة في النسخة التجريبية. اربط مشروع Supabase تجريبي مستقل قبل تفعيل الطلبات أو تسجيل الدخول.");
  }
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase غير مهيأ بعد. أضف VITE_SUPABASE_URL وVITE_SUPABASE_ANON_KEY إلى متغيرات البيئة.");
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}
