interface GarminIconProps {
  className?: string;
  size?: number;
}

export const GarminIcon = ({ className, size = 24 }: GarminIconProps) => {
  return (
    <img
      src="https://cdn.brandfetch.io/iduRj5zc0_/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
      alt="Garmin"
      className={className}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
};
