function ImageGallery({ images, onSelectImage }) {
  return (
    <div className="image-gallery">
      {images.map((img) => {
        return (
          <div className="image-box" key={img.id}>
            <div className="img-container">
              <img src={img.src.original} alt={img.alt} />
            </div>
            <button onClick={() => onSelectImage(img.src.original)}>
              Add Captions
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ImageGallery;
