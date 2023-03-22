import { SetStateAction, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import { cryptos } from "@/mocks/cryptos";

const SwapPage = () => {


  const [searchField, setSearchField] = useState("");
  const [firstPickedCrypto, setFirstPickedCrypto] = useState("BTC");
  const [secondPickedCrypto, setSecondPickedCrypto] = useState("ETH");
  const [firstInputValue, setFirstInputValue] = useState(0);
  const [secondInputValue, setSecondInputValue] = useState(0);

  const filteredFirstCrypto = cryptos.filter((crypto) => {
    return crypto.title === firstPickedCrypto;
  });
  const filteredSecondCrypto = cryptos.filter((crypto) => {
    return crypto.title === secondPickedCrypto;
  });

  const filteredPersons = cryptos.filter((item) => {
    return item.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }): any => {
    setSearchField(event.target.value);
  };

  
  return (
    <Layout>
      <Main
        firstPickedCrypto={filteredFirstCrypto[0]}
        setFirstPickedCrypto={setFirstPickedCrypto}
        secondPickedCrypto={filteredSecondCrypto[0]}
        setSecondPickedCrypto={setSecondPickedCrypto}
        handleChangeFirstData={setFirstInputValue}
        handleChangeSecondData={setSecondInputValue}
      />
    </Layout>
  );
};

export default SwapPage;
