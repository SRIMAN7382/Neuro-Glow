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
import { Session } from '@supabase/supabase-js';

export default function AuthButton() {
  const [session, setSession] = useState<Session | null>(null);
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

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {session ? 'Sign Out' : 'Sign In'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
        ) : (
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(null);
            }}
          >
            Sign Out
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}