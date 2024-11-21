import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-90-screen text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-600">404 - Not Found</h1>
      <p className="text-xl mb-6 text-gray-600">
        Sorry, the page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green text-white rounded-md hover:bg-green-dark transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
