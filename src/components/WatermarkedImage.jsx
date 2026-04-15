import { useEffect, useRef, useState } from "react";

export default function WatermarkedImage({ src, watermarkText }) {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Prevent CORS issues
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas size equal to image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Add watermark text
      ctx.font = "bold 24px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Semi-transparent white
      ctx.textAlign = "center";

      // Position watermark at the center
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 50);

      // Convert canvas to an image URL
      setImageUrl(canvas.toDataURL("image/png"));
    };
  }, [src, watermarkText]);

  return (
    <div className="relative">
      {/* Render watermarked image */}
      {imageUrl && <img src={imageUrl} alt="Watermarked" className="w-full" />}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
