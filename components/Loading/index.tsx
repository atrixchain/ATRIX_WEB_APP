import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Loading = () => (
  <SyncLoader color="#36d7b7" size={17} cssOverride={override} />
);

export default Loading;
