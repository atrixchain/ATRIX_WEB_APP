import { Button } from "antd";

type ButtonProps = {
  title: JSX.Element;
  type?: "link" | "text" | "default" | "primary" | "dashed";
  style: string;
  onClick: (evt: any) => void;
};

const CardButton = ({ title, type, style, onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick} type={type} className={style}>
      {title}
    </Button>
  );
};

export default CardButton;
