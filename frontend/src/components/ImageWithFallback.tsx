import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, style }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const defaultImg = 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg';

  const handleError = () => {
    setImgSrc(defaultImg);
  };

  return <img src={imgSrc} alt={alt} style={style} onError={handleError} />;
};

export default ImageWithFallback;