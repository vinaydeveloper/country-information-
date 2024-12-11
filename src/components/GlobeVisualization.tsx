import { useEffect, useRef } from 'react';
import styles from './GlobeVisualization.module.css';

export function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = 0;
    const dots: { x: number; y: number; speed: number; size: number }[] = [];

    // Create initial dots
    for (let i = 0; i < 100; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.2)';
      ctx.beginPath();
      dots.forEach((dot, i) => {
        dots.forEach((otherDot, j) => {
          if (i !== j) {
            const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);
            if (distance < 100) {
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(otherDot.x, otherDot.y);
            }
          }
        });
      });
      ctx.stroke();

      // Update and draw dots
      dots.forEach(dot => {
        dot.x += Math.cos(rotation) * dot.speed;
        dot.y += Math.sin(rotation) * dot.speed;

        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        ctx.fillStyle = 'rgba(79, 70, 229, 0.6)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      rotation += 0.002;
      requestAnimationFrame(animate);
    }

    animate();

    const resizeHandler = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return <canvas ref={canvasRef} className={styles.globe} />;
}