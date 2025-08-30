'use client';

import { useRef, useEffect, useState } from 'react';

const FishEasterEgg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameId = useRef<number>();
  const animationStartTime = useRef<number>(0);

  const fishWidth = 120;
  const fishHeight = 80;

  const drawFish = (tailAngle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    
    // Body
    ctx.beginPath();
    ctx.moveTo(-50, 0); // nose
    ctx.quadraticCurveTo(0, -40, 40, -20); // top
    ctx.lineTo(55, -30); // tail top start
    ctx.lineTo(55, 30); // tail bottom end
    ctx.lineTo(40, 20); // tail bottom join
    ctx.quadraticCurveTo(0, 40, -50, 0); // bottom
    ctx.stroke();
    
    // Eye
    ctx.beginPath();
    ctx.arc(-35, -2, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Gill
    ctx.beginPath();
    ctx.moveTo(-20, -15);
    ctx.quadraticCurveTo(-10, 0, -20, 15);
    ctx.stroke();

    // Dorsal Fin
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(15, -38);
    ctx.lineTo(25, -25);
    ctx.stroke();
    
    // Pectoral Fin
    ctx.beginPath();
    ctx.moveTo(-15, 18);
    ctx.lineTo(-5, 32);
    ctx.lineTo(5, 18);
    ctx.stroke();
    
    // Tail fin details with animation
    ctx.save();
    ctx.translate(55, 0); 
    ctx.rotate(tailAngle);
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(20, -15);
    ctx.lineTo(20, 15);
    ctx.lineTo(0, 30);
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
        const angle = Math.sin(elapsedTime / 40) * 0.4; // Flapping motion
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
      width={fishWidth + 60}
      height={fishHeight + 60}
      onClick={handleClick}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-0"
      style={{ imageRendering: 'pixelated' }}
      title="?"
    />
  );
};

export default FishEasterEgg;
