// App.js

import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file

const  App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      const data = await response.json();
      // Map over the data to modify image URLs and add smaller size parameters
      const resizedImages = data.map((image, index) => ({
        ...image,
        download_url: index === 0 ? `${image.download_url}?w=300&h=200` : `${image.download_url}?w=100&h=100`, // Adjust width and height for the first image
        className: index === 0 ? "first-image" : index < 3 ? "second-image" : "normal-image" // Assign different class based on index
      }));
      setImages(prevImages => [...prevImages, ...resizedImages]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <div className="image-grid">
        {images.map(image => (
          <img 
            key={image.id} 
            src={image.download_url} 
            alt={image.author} 
            className={image.className} // Apply className dynamically
          />
        ))}
      </div>
      <button onClick={loadMoreImages}>Load More</button>
    </div>
  );
};

export default App;
