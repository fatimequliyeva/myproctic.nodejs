import './App.css';
import AddBook from './pages/AddBook';
import Book from "./pages/Book";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">📚 Kitab Mağazası</h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-yellow-300 transition">Ana səhifə</Link>
              </li>
              <li>
                <Link to="/addbook" className="hover:text-yellow-300 transition">Kitab əlavə et</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto py-8 px-6">
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/addbook" element={<AddBook />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
