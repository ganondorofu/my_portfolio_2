'use client';

import { useRef, useEffect, useState } from 'react';

const FishEasterEgg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameId = useRef<number>();
  const animationStartTime = useRef<number>(0);

  const fishWidth = 100;
  const fishHeight = 60;

  const drawFish = (tailAngle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 40, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffcc00'; // Orange-yellow
    ctx.fill();
    ctx.strokeStyle = '#e6b800';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Eye
    ctx.beginPath();
    ctx.arc(25, -5, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(26, -5, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // Tail
    ctx.save();
    ctx.translate(-40, 0);
    ctx.rotate(tailAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-20, -20);
    ctx.lineTo(-15, 0);
    ctx.lineTo(-20, 20);
    ctx.closePath();
    ctx.fillStyle = '#ffcc00';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  };

  useEffect(() => {
    drawFish();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      animationStartTime.current = performance.now();
      const animate = (time: number) => {
        const elapsedTime = time - animationStartTime.current;
        if (elapsedTime > 500) { // Animate for 500ms
          setIsAnimating(false);
          drawFish(0); 
          return;
        }
        const angle = Math.sin(elapsedTime / 40) * 0.5; // Flapping motion
        drawFish(angle);
        animationFrameId.current = requestAnimationFrame(animate);
      };
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAnimating]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isAnimating) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Simple bounding box check for the fish body
    if (
      x > centerX - fishWidth / 2 &&
      x < centerX + fishWidth / 2 &&
      y > centerY - fishHeight / 2 &&
      y < centerY + fishHeight / 2
    ) {
      setIsAnimating(true);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={fishWidth + 40}
      height={fishHeight + 40}
      onClick={handleClick}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-[-10]"
      style={{ imageRendering: 'pixelated' }}
      title="?"
    />
  );
};

export default FishEasterEgg;
