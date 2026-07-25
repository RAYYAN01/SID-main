import React from 'react';
import Image from 'next/image';

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/logo-circle.png"
        alt="SID Events logo"
        fill
        sizes="120px"
        className="object-contain"
        priority
      />
    </span>
  );
};
