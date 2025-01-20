interface FitbitIconProps {
  className?: string;
  size?: number;
}

export const FitbitIcon = ({ className, size = 24 }: FitbitIconProps) => {
  return (
    <img
      src="https://cdn.brandfetch.io/idIrdiIB8m/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
      alt="Fitbit"
      className={className}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
};
