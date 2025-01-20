interface OuraIconProps {
  className?: string;
  size?: number;
}

export const OuraIcon = ({ className, size = 24 }: OuraIconProps) => {
  return (
    <img
      src="https://cdn.brandfetch.io/idP5gvxh_g/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
      alt="Oura Ring"
      className={className}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
};
