"use client";

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js'; // ✅ import this

export default function AuthButton() {
  const [session, setSession] = useState<Session | null>(null); // ✅ typed correctly
  const [open, setOpen] = useState(false);

  useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
    if (session) setOpen(false);
  });

  return () => subscription.unsubscribe(); // ✅ return cleanup
}, []);
