import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-5xl font-semibold text-fg">Page not found</h1>
      <p className="mt-4 max-w-md text-muted">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary mt-8">
        Go to the portfolio
      </Link>
    </main>
  );
}
