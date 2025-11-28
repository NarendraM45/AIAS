import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const LampToggle = () => {
  const { landingTheme, toggleLandingTheme } = useTheme();
  const isLight = landingTheme === 'light';

  return (
    <motion.button
      onClick={toggleLandingTheme}
      className="relative w-14 h-7 rounded-full bg-card border-2 border-border p-0.5 cursor-pointer"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-gradient-to-br from-electric to-teal glow-electric flex items-center justify-center"
        animate={{
          x: isLight ? 0 : 28,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {isLight ? (
          <Sun className="w-3.5 h-3.5 text-white" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};
