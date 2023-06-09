export const SESSION_STORAGE = {
  WALLET: "WALLET",
  SIGNER: "SIGNER",
};

export const displayAddress = (address: string) =>
  `${String(address).substring(0, 5)}...${String(address).substring(38)}`;

export const getTwitterDatas = async () => {
  try {
    const getTwitterDatas = sessionStorage.getItem("twitterDatas") || "";
    const twDatas = await JSON.parse(getTwitterDatas);
    return twDatas;
  } catch (err) {
    return null;
  }
};
