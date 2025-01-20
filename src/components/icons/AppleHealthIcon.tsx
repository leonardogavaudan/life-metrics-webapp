interface AppleHealthIconProps {
  className?: string;
  size?: number;
}

export const AppleHealthIcon = ({
  className,
  size = 24,
}: AppleHealthIconProps) => {
  return (
    <img
      src="https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B"
      alt="Apple Health"
      className={className}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
};
