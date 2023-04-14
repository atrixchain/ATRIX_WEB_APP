import { Divider, Space } from "antd";
import { PropsWithChildren, ReactNode } from "react";
import styles from "./Card.module.sass";
import cn from "classnames";
import Button from "../Button";
import { DownOutlined } from "@ant-design/icons";

type CardProps = {
  title: string;
  firstContent: string;
  secondContent: string;
  firstButtonTitle: string;
  secondButtonTitle: string;
  thirdButtonTitle: string;
  isThirdButtonOpacity: boolean;
  opacityText: string;
  showButtons: boolean;
  viewAllButtonTitle: string;
  isEarnAtrixScreen: boolean;
  firstButtonPurple: boolean;
  secondButtonPurple: boolean;
  thirdButtonPurple: boolean;
  disable: boolean;
};

const AtrixCard = ({
  title,
  firstContent,
  secondContent,
  firstButtonTitle,
  secondButtonTitle,
  thirdButtonTitle,
  isThirdButtonOpacity,
  opacityText,
  showButtons,
  viewAllButtonTitle,
  isEarnAtrixScreen,
  firstButtonPurple,
  secondButtonPurple,
  thirdButtonPurple,
  disable,
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
            <Button
              style={styles.viewAllButtonTitle}
              onClick={() => console.log(123)}
              title={
                <div>
                  {viewAllButtonTitle}
                  <DownOutlined />
                </div>
              }
              type={"link"}
            />
          </Space>
        )}
      </Space>
      <Space direction="vertical">
        {showButtons && (
          <div className={styles.buttonContainer}>
            <Button
              style={firstButtonPurple ? styles.buttonPurple : styles.button}
              onClick={() => console.log(123)}
              title={<div>{firstButtonTitle}</div>}
              type={"primary"}
            />
            {isEarnAtrixScreen && <Divider />}
            <Button
              style={
                secondButtonPurple
                  ? styles.buttonPurple
                  : disable
                  ? styles.disabledButton
                  : styles.button
              }
              onClick={() => console.log(123)}
              title={<div>{secondButtonTitle}</div>}
              type={"primary"}
            />
            <div>
              {isThirdButtonOpacity ? (
                <div className={styles.opacityText}>{opacityText}</div>
              ) : (
                <Button
                  style={
                    thirdButtonPurple
                      ? styles.buttonPurple
                      : disable
                      ? styles.disabledButton
                      : styles.button
                  }
                  onClick={() => console.log(123)}
                  title={<div>{thirdButtonTitle}</div>}
                  type={"primary"}
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
