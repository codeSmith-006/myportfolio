/**
 * use3DTilt.js
 * 
 * Premium 3D tilt micro-interaction hook.
 * Applies subtle rotateX/rotateY on mouse move over an element.
 * GPU-accelerated using transform only.
 */

import { useCallback, useRef } from 'react';

const use3DTilt = ({ maxTilt = 6, scale = 1.02, speed = 400 } = {}) => {
  const ref = useRef(null);
  const rafId = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    // Cancel previous frame to avoid stacking
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    });
  }, [maxTilt, scale, speed]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  }, [speed]);

  return { ref, onMouseMove, onMouseLeave };
};

export default use3DTilt;
