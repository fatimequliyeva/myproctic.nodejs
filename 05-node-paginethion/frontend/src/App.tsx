import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold">🛒 Shop App</h1>
      </header>
      <main className="py-10">
        <ProductList />
      </main>
    </div>
  );
}

export default App;
