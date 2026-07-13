import React from 'react';
import { Navigate } from 'react-router-dom';

function NotFound() {
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectToHome(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading my-8 text-6xl tracking-wider text-slate-100 drop-shadow-md">
        Page not found
      </h1>
      <p className="text-xl font-medium text-slate-100/90">
        Going to redirect to home in 10 seconds
      </p>
      {redirectToHome && <Navigate to="/" />}
    </main>
  );
}

export default NotFound;
