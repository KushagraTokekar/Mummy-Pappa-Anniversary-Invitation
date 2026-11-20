import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacityDelta: number;
  color: string;
}

export const SilverParticles: React.FC<{ density?: number; className?: string }> = ({
  density = 40,
  className = 'absolute inset-0 pointer-events-none z-0',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(226, 232, 240, ',
      'rgba(192, 192, 192, ',
      'rgba(247, 231, 206, ', // Champagne
      'rgba(212, 175, 55, ',  // Soft Gold
    ];

    const particles: Particle[] = [];
    const count = Math.min(density, Math.floor((width * height) / 20000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15, // gently drift upwards
        opacity: Math.random() * 0.7 + 0.2,
        opacityDelta: (Math.random() - 0.5) * 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDelta;

        if (p.opacity <= 0.1 || p.opacity >= 0.85) {
          p.opacityDelta = -p.opacityDelta;
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} />;
};
