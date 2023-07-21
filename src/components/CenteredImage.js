import React from 'react';
import './CenteredImage.css'; // Create a separate CSS file for styling or add the styles inline in the component

const CenteredImage = ({ imageName, alt }) => {
  return (
    <div className="centered-image-container">
      <img src={`/images/${imageName}`} alt={alt} />
    </div>
  );
};

export default CenteredImage;
