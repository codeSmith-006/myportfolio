/**
 * useMagnetic.js
 * 
 * Magnetic hover effect for interactive elements.
 * Subtly pulls the element toward the cursor position.
 * Clean and premium — not overdone.
 */

import { useCallback, useRef } from 'react';

const useMagnetic = ({ strength = 0.3, returnSpeed = 300 } = {}) => {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;

    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    el.style.transition = 'transform 150ms ease-out';
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
    el.style.transition = `transform ${returnSpeed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  }, [returnSpeed]);

  return { ref, onMouseMove, onMouseLeave };
};

export default useMagnetic;
