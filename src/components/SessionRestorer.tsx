import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { restoreSessionFromCookie } from "@/services/auth/cookieUtils";
import { signin } from "@/services/auth/slice";

interface SessionRestorerProps {
  children: React.ReactNode;
}

export default function SessionRestorer({ children }: SessionRestorerProps) {
  const [isRestoring, setIsRestoring] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const sessionData = restoreSessionFromCookie();

        if (sessionData) {
          // Restore session in Redux store
          dispatch(signin(sessionData));
          console.log("Session restored from cookie successfully");
        }
      } catch (error) {
        // Silently clear invalid session - user will see login page naturally
        console.log("Invalid session detected, cleared silently");
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (isRestoring) {
    // Show loading state during restoration
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-surface-400">Restoring session...</p>
        </div>
      </div>
    );
  }

  // Session restored or no session to restore - render children
  return <>{children}</>;
}