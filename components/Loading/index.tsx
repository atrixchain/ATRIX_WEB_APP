import SyncLoader from "react-spinners/BeatLoader";
import styles from "./Loading.module.sass";

const Loading = () => (
  <div className={styles.loadingGlobal}>
    <div className={styles.loading}>
      <SyncLoader color="#5442d0" size={20} />
    </div>
  </div>
);

export default Loading;
