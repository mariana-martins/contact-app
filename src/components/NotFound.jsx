import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const headingRef = React.useRef(null);
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Page Not Found | Contact App';
    if (headingRef.current) {
      headingRef.current.focus();
    }
    const timer = setTimeout(() => {
      setRedirectToHome(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (redirectToHome) {
      navigate('/', { replace: true });
    }
  }, [redirectToHome, navigate]);

  return (
    <main className="flex w-full flex-col items-center justify-center text-center">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading my-8 text-6xl tracking-wider text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] focus:outline-none focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white rounded-lg text-balance"
      >
        Page not found
      </h1>
      <div className="mt-2 rounded-2xl bg-white px-8 py-5 shadow-xl ring-1 ring-slate-900/10">
        <p className="text-lg font-bold text-slate-800">
          Going to redirect to home in 10 seconds
        </p>
      </div>
    </main>
  );
}

export default NotFound;
