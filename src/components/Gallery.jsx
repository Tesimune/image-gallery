import { useRef, useState } from "react";
import Data from "../assets/GalleryArray.json";

function Gallery({ auth, searchFilter }) {
  const [characters, updateCharacters] = useState(Data.GalleryArray);

  const dragSection = useRef(null);
  const draggedOverSection = useRef(null);

  function handleDragStart(index) {
    dragSection.current = index;
  }

  function handleDragEnter(index) {
    if (dragSection.current !== null) {
      draggedOverSection.current = index;
    }
  }

  function handleSort() {
    if (dragSection.current !== null && draggedOverSection.current !== null) {
      const charactersClone = [...characters];
      const temp = charactersClone[dragSection.current];
      charactersClone[dragSection.current] =
        charactersClone[draggedOverSection.current];
      charactersClone[draggedOverSection.current] = temp;
      updateCharacters(charactersClone);
      dragSection.current = null;
      draggedOverSection.current = null;
    }
  }

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-center pt-5">
        <span>Hello, {auth}</span>
      </div>
      <div id="image-grid" className="row">
        {characters
          .filter((gallery) =>
            gallery.title.toLowerCase().includes(searchFilter.toLowerCase())
          )
          .map((gallery, index) => (
            <div
              className="card"
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleSort}
              onTouchStart={() => handleDragStart(index)}
              onTouchMove={() => handleDragEnter(index)}
              onTouchEnd={handleSort}
            >
              <img
                className="card-img-top h-75"
                src={gallery.image}
                alt={gallery.title}
              />
              <div className="card-body">
                <h5 className="card-title">{gallery.title}</h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Gallery;
