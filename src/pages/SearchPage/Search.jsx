import { useState } from "react";
import "./search.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import Canvas from "./CanvasSection/Canvas";

const API_KEY = "wAFPJGHmFN9vEb3eCGkOqMI5KNUHMokpW02VNCwNIOk6NmjcobIJro2m";

function Search() {
  const [searchVal, setSearchVal] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const generateImages = async () => {
    const URL = `https://api.pexels.com/v1/search?query=${searchVal}`;
    const response = await fetch(URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    console.log(data.photos);
    setImages(data.photos);
  };

  function handleSearchChange(e) {
    setSearchVal(e.target.value);
  }

  function handleSearchClick() {
    console.log(searchVal);
    generateImages();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  }

  return (
    <div className="search-page">
      <p>Name: Varsha G Shenoy</p>
      <p>Email: varshashenoy108@gmail.com</p>
      <input
        type="text"
        placeholder="search..."
        value={searchVal}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearchClick}>🔍</button>
      {/* <ImageGallery images={images} />
      <Canvas /> */}
      {!selectedImage ? (
        <ImageGallery images={images} onSelectImage={setSelectedImage} />
      ) : (
        <Canvas image={selectedImage} onBack={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

export default Search;
