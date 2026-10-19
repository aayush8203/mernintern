import React, { useState } from "react";
import Modal from "./Modal";

const PropertyImg = ({ images = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const safeImages = Array.isArray(images) ? images : [];
  const firstImage = safeImages[0]?.url || "";
  const lastImage = safeImages[4]?.url || safeImages[safeImages.length - 1]?.url || firstImage;

  return (
    <>
      <div className="property-img-container">
        <div className="img-item">
          <img
            src={firstImage}
            className="images"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            alt="property-1"
          />
        </div>

        {safeImages.slice(1, 4).map((image, index) => (
          <div key={index}>
            <img
              className="images"
              src={image?.url}
              alt={`property-${index + 2}`}
            />
          </div>
        ))}
        <div>
          <img
            className="images"
            src={lastImage}
            alt="property-5"
            style={{ borderBottomRightRadius: "10px" }}
          />
          <button className="similar-photos" onClick={handleShowAllPhotos}>
            <span className="material-symbols-outlined">photo_library</span>
          </button>
        </div>
      </div>

      <div className="similar-photos-container"></div>
      {isModalOpen && <Modal images={safeImages} onClose={handleCloseModal} />}
    </>
  );
};

export default PropertyImg;
