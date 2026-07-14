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
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-heading my-8 text-6xl tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white rounded-lg text-balance"
      >
        Page not found
      </h1>
      <p className="text-xl font-medium text-slate-100/90">
        Going to redirect to home in 10 seconds
      </p>
    </main>
  );
}

export default NotFound;
