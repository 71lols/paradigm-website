import React from 'react';

interface GradientEllipse {
  id: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  colors: {
    from: string;
    to: string;
  };
  blur?: number;
  opacity?: number;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface GradientContainerProps {
  children?: React.ReactNode;
  ellipses: GradientEllipse[];
  className?: string;
  containerHeight?: string;
  rounded?: string;
}

const GradientContainer: React.FC<GradientContainerProps> = ({
  children,
  ellipses,
  className = '',
  containerHeight = 'min-h-96',
  rounded = 'rounded-xl'
}) => {
  const getBlurStyle = (blur?: number) => {
    if (!blur) return {};
    return { filter: `blur(${blur}px)` };
  };

  const getPositionStyle = (ellipse: GradientEllipse) => ({
    left: `${ellipse.position.x}%`,
    top: `${ellipse.position.y}%`,
    width: `${ellipse.size.width}px`,
    height: `${ellipse.size.height}px`,
    transform: `translate(-50%, -50%) ${ellipse.rotation ? `rotate(${ellipse.rotation}deg)` : ''}`,
  });

  const getGradientStyle = (colors: GradientEllipse['colors']) => ({
    background: `radial-gradient(ellipse, ${colors.from} 0%, ${colors.to} 70%)`
  });

  return (
    <div className={`relative overflow-hidden ${containerHeight} ${rounded} ${className}`}>
      {ellipses.map((ellipse) => (
        <div
          key={ellipse.id}
          className={`absolute rounded-full pointer-events-none ${ellipse.className || ''}`}
          style={{
            ...getPositionStyle(ellipse),
            ...getGradientStyle(ellipse.colors),
            ...getBlurStyle(ellipse.blur),
            opacity: (ellipse.opacity || 50) / 100,
            ...ellipse.style,
          }}
        />
      ))}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default GradientContainer;