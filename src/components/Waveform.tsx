import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WaveformProps {
  audioFile?: File;
  audioUrl?: string;
}

export const Waveform = ({ audioFile, audioUrl }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulate waveform generation
    setTimeout(() => setIsAnalyzing(false), 1500);

    const drawWaveform = () => {
      const width = canvas.width;
      const height = canvas.height;
      const bars = 100;
      const barWidth = width / bars;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * height * 0.8;
        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, 'hsl(200, 98%, 55%)');
        gradient.addColorStop(1, 'hsl(187, 71%, 50%)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      }
    };

    let animationId: number;
    const animate = () => {
      drawWaveform();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [audioFile, audioUrl]);

  return (
    <div className="relative w-full h-32 bg-card border border-border rounded-lg overflow-hidden">
      {isAnalyzing && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Analyzing audio...</p>
          </div>
        </motion.div>
      )}
      <canvas
        ref={canvasRef}
        width={800}
        height={128}
        className="w-full h-full"
      />
    </div>
  );
};
