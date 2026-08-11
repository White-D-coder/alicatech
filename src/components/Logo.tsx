interface LogoProps {
  className?: string;
  height?: number;
  color?: string; // '#006828' or '#ffffff'
}

export const Logo = ({ className = '', height = 44, color = '#006828' }: LogoProps) => {
  const isWhite = color === '#ffffff' || color === 'white';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/Alica-green.svg"
        alt="Alica Technologies LLP"
        style={{
          height: `${height}px`,
          width: 'auto',
          filter: isWhite ? 'brightness(0) invert(1)' : 'none',
        }}
        className="object-contain transition-all duration-200"
      />
    </div>
  );
};
