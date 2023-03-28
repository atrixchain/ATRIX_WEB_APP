import { Button, Space } from "antd";
import { PropsWithChildren, ReactNode } from "react";
import styles from "./Button.module.sass";
import cn from "classnames";

type ButtonProps = {
  title: string;
  green: boolean;
  purple: boolean;
  disable: boolean;
  type: any
};

const cardButton = ({ title, green, purple, disable, type }: ButtonProps) => {
  return (
    <Button
      type={type}
      className={cn(
        styles.button,
        { [styles.green]: green },
        { [styles.purple]: purple },
        { [styles.disable]: disable }
      )}
    >
      {title}
    </Button>
  );
};

export default cardButton;
