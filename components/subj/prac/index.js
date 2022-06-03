import { useState, createContext } from "react";
import Style from "styles/subj/prac.module.scss";
import PracList from "./list";
import Interface from "./interface";
export const CostumeData = createContext();

export default function Prac() {
  const [pid, setPid] = useState(undefined);
  const [result, setResult] = useState(undefined);

  const [expectedLength, setExpectedLength] = useState(1);
  return (
    <section className={Style.prac}>
      {pid && <p>تمارين</p>}
      <CostumeData.Provider
        value={{
          setPid,
          result,
          setResult,
          expectedLength,
          setExpectedLength
        }}
      >
        <PracList />
        {pid && <Interface pid={pid} />}
      </CostumeData.Provider>
    </section>
  );
}
