import { Button, Divider, Space } from "antd";
import { PropsWithChildren, ReactNode } from "react";
import styles from "./Card.module.sass";
import cn from "classnames";
import ButtonComponents from "../Button/button";
import { DownOutlined } from "@ant-design/icons";

type CardProps = {
  title: string;
  firstContent: string;
  secondContent: string;
  firstButtonTitle: string;
  secondButtonTitle: string;
  thirdButtonTitle: string;
  green: boolean;
  purple: boolean;
  disabled: boolean;
  isThirdButtonOpacity: boolean;
  opacityText: string;
  showButtons: boolean;
  viewAllButtonTitle: string;
  isEarnAtrixScreen: boolean;
};

const text = "text";

const AtrixCard = ({
  title,
  firstContent,
  secondContent,
  firstButtonTitle,
  secondButtonTitle,
  thirdButtonTitle,
  green,
  purple,
  disabled,
  isThirdButtonOpacity,
  opacityText,
  showButtons,
  viewAllButtonTitle,
  isEarnAtrixScreen,
}: CardProps) => {
  return (
    <Space
      direction="horizontal"
      className={!showButtons ? styles.cardFlexStart : styles.card}
    >
      <Space direction="vertical">
        <div className={styles.title}>{title}</div>
        <div
          className={!showButtons ? styles.contextMaxWidth : styles.contentText}
        >
          {firstContent}
        </div>
        {secondContent && (
          <div className={styles.contentText}>{secondContent}</div>
        )}
        {viewAllButtonTitle && (
          <Space direction="horizontal" className={styles.viewAllButton}>
            <Button type="link" className={styles.viewAllButtonTitle}>
              {viewAllButtonTitle}
              <DownOutlined />
            </Button>
          </Space>
        )}
      </Space>
      <Space direction="vertical">
        {showButtons && (
          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <ButtonComponents
                type={""}
                green={green}
                title={firstButtonTitle}
                purple={purple}
                disable={false}
              />
            </div>
            {isEarnAtrixScreen && <Divider />}
            <div className={styles.button}>
              <ButtonComponents
                type={""}
                green={green}
                title={secondButtonTitle}
                purple={purple}
                disable={disabled}
              />
            </div>
            <div className={styles.button}>
              {isThirdButtonOpacity ? (
                <div className={styles.opacityText}>{opacityText}</div>
              ) : (
                <ButtonComponents
                  type={""}
                  green={green}
                  title={thirdButtonTitle}
                  purple={purple}
                  disable={disabled}
                />
              )}
            </div>
          </div>
        )}
      </Space>
    </Space>
  );
};

export default AtrixCard;
