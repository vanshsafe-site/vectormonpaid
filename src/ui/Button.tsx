import type { ButtonHTMLAttributes } from 'react';
import { audio } from '@/audio/AudioEngine';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', onClick, children, ...rest }: Props) {
  return (
    <button
      className={`vm-btn vm-btn-${variant}`}
      onMouseEnter={() => audio.playSfx('hover')}
      onClick={(e) => {
        audio.playSfx('click');
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
