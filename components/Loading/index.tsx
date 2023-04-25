import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/BeatLoader";
import styles from "./Loading.module.sass";
import Image from "@/components/Image";

interface LoadingProps {
  suspense: boolean;
}
const Loading = ({ suspense }: LoadingProps) => (
  <div className={suspense ? styles.loadingSuspense : styles.loadingGlobal}>
    <div className={suspense ? styles.loadingIconSuspense : styles.loading}>
      {suspense ? (
        <Image src={"/images/logo.svg"} width={300} height={300} />
      ) : (
        <SyncLoader color="#5442d0" size={20} />
      )}
    </div>
  </div>
);

export default Loading;
