import { RenderIf } from "../render-if";
import styles from "./button.module.scss";
import { ButtonProps } from "./button.type";
import clsx from "clsx";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    onClick,
    fullWidth = false,
    loading = false,
    disabled = false,
    className,
    ...otherProps
  } = props;

  const handleOnClick: ButtonProps["onClick"] = (e) => {
    if (disabled || loading) return;

    if (onClick) onClick(e);
  };

  return (
    <button
      className={clsx(styles.buttonRoot, className, {
        [styles.buttonFullWidth]: fullWidth,
        [styles.buttonNormalWidth]: !fullWidth,
      })}
      onClick={handleOnClick}
      {...otherProps}
    >
      <RenderIf isTrue={loading}>
        <div className={styles.loader} role="progressbar" />
      </RenderIf>

      <RenderIf isTrue={!loading}>{children}</RenderIf>
    </button>
  );
};

export default Button;
