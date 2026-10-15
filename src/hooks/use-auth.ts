import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

type AuthUser = User & { name?: string | null };

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    const supabase = getSupabase();
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) console.error("Supabase session restore failed:", error.message);
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (provider: string, formData?: FormData) => {
    const supabase = getSupabase();
    if (provider === "anonymous") {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      return;
    }
    if (provider !== "email-otp" || !formData) {
      throw new Error("طريقة تسجيل الدخول غير مدعومة.");
    }

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const code = String(formData.get("code") ?? "").trim();
    if (!email) throw new Error("اكتب البريد الإلكتروني أولًا.");

    if (code) {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
      if (error) throw error;
    } else {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
      if (error) throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const { error } = await getSupabase().auth.signOut();
    if (error) throw error;
  }, []);

  const user = session?.user ? ({
    ...session.user,
    name: session.user.user_metadata?.full_name ?? session.user.user_metadata?.name ?? null,
  } as AuthUser) : null;

  return { isLoading, isAuthenticated: Boolean(session?.user), user, session, signIn, signOut };
}
