interface CorosIconProps {
  className?: string;
  size?: number;
}

export const CorosIcon = ({ className, size = 24 }: CorosIconProps) => {
  return (
    <img
      src="https://cdn.brandfetch.io/idFXBq9hsJ/w/1080/h/1080/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B"
      alt="Coros"
      className={className}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
};
