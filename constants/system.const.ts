export const SESSION_STORAGE = {
  WALLET: "WALLET",
  SIGNER: "SIGNER",
};

export const displayAddress = (address: string) =>
  `${String(address).substring(0, 5)}...${String(address).substring(38)}`;
