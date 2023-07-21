import React, { useState } from 'react';
import './CenteredImage.css'; // Create a separate CSS file for styling or add the styles inline in the component

const CenteredImage = ({ imageName, alt }) => {
  return (
    <div className="centered-image-container">
      <img
        src={`/images/${imageName}`}
        alt={alt}
      />
    </div>
  );
};

const ImageOverlay = ({ overlayImageName, position }) => {
  return (
    <div
      className="overlay-image"
      style={{ position: "absolute", left: position.left, top: position.top }}
    >
      <img
        src={`/images/${overlayImageName}`}
        alt="Overlay Image"
        style={{ maxWidth: '250px', maxHeight: '67px' }} // Set the desired maximum width and height here
      />
    </div>
  );
};

const App = () => {
  const [overlayImages, setOverlayImages] = useState([]);

  const handleImageClick = (e) => {
    const xPos = e.pageX;
    const yPos = e.pageY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const overlayXPos = xPos - 250 / 2; // Adjust for half of overlay width
    const overlayYPos = yPos - 67 / 2; // Adjust for half of overlay height

    // Replace "overlay.png" with the name of the image you want to display at the clicked position.
    // You can also use the uploaded image from the user, etc.
    const newOverlay = {
      imageName: "mgr.png",
      position: {
        left: overlayXPos > 0 ? (overlayXPos + 250 > windowWidth ? windowWidth - 250 : overlayXPos) : 0,
        top: overlayYPos > 0 ? (overlayYPos + 67 > windowHeight ? windowHeight - 67 : overlayYPos) : 0,
      },
    };

    const existingOverlays = overlayImages.filter((overlay) => overlay.imageName === newOverlay.imageName);

    if (existingOverlays.length >= 2) {
      // Remove the first overlay of the same type if there are already two
      setOverlayImages((prevOverlays) => prevOverlays.slice(1));
    }

    // Add the new overlay
    setOverlayImages((prevOverlays) => [...prevOverlays, newOverlay]);
  };

  return (
    <div onClick={handleImageClick}>
      <CenteredImage
        imageName="attendanceSheet.png"
        alt="Centered Image"
      />

      {overlayImages.map((overlay, index) => (
        <ImageOverlay
          key={index}
          overlayImageName={overlay.imageName}
          position={overlay.position}
        />
      ))}
    </div>
  );
};

export default App;
