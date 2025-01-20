interface WhoopIconProps {
  className?: string;
  size?: number;
}

export const WhoopIcon = ({ className, size = 24 }: WhoopIconProps) => {
  return (
    <img
      src="https://cdn.brandfetch.io/id9xZWCDrm/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
      alt="Whoop"
      className={className}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
};
