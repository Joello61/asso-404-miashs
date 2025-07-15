'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Version sans animations (si vous ne voulez pas utiliser Framer Motion)
export function SimpleTemplate({ children }: TemplateProps) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}