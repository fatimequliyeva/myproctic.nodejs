import { useState } from "react";

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('price', price);
    formData.append("coverImage", coverImage);

    try {
      const res = await fetch('http://localhost:8080/api/books/add', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      console.log("Yeni kitab əlavə olundu:", data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        
        {/* Sol hissə: şəkil preview */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r pr-0 md:pr-6 pb-6 md:pb-0">
          <h2 className="text-xl font-semibold mb-4">Şəkil seç</h2>
          <input 
            type="file" 
            onChange={e => setCoverImage(e.target.files[0])} 
            className="mb-4"
          />
          {coverImage && (
            <img 
              src={URL.createObjectURL(coverImage)} 
              alt="Preview" 
              className="w-48 h-64 object-cover rounded-md shadow-md"
            />
          )}
        </div>

        {/* Sağ hissə: kitab məlumatları */}
        <form 
          onSubmit={handleSubmit} 
          encType="multipart/form-data" 
          className="flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold mb-2">Kitab məlumatları</h2>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Title" 
            className="border rounded p-2 focus:ring focus:ring-blue-300"
          />
          <input 
            type="text" 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            placeholder="Author" 
            className="border rounded p-2 focus:ring focus:ring-blue-300"
          />
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Description" 
            className="border rounded p-2 focus:ring focus:ring-blue-300"
          />
          <input 
            type="number" 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
            placeholder="Price" 
            className="border rounded p-2 focus:ring focus:ring-blue-300"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
