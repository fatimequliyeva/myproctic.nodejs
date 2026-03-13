import React, { useState, useEffect } from "react";

// Tour tipini müəyyən edirik
interface Tour {
  id: string;
  title: string;
  destination: string;
  price: number;
  discountPrice: number;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  capacity: number;
}

const TourList: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  const fetchTours = (sort?: string, order?: string) => {
    let url = "http://localhost:3000/tours";
    if (sort && order) {
      url += `?sort=${sort}&order=${order}`;
    }

    fetch(url)
      .then(res => res.json())
      .then((data: Tour[]) => setTours(data))
      .catch(err => console.error("Error:", err));
  };

  // İlk açılışda bütün turlar gəlsin
  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => fetchTours("price", "asc")}>Qiymət ↑</button>
        <button onClick={() => fetchTours("price", "desc")}>Qiymət ↓</button>
        <button onClick={() => fetchTours("title", "asc")}>Başlıq A–Z</button>
        <button onClick={() => fetchTours("title", "desc")}>Başlıq Z–A</button>
      </div>

      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            <strong>{tour.title}</strong> — {tour.destination} — {tour.price}$
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;
