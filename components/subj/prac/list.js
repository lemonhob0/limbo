import { gql, useLazyQuery } from "@apollo/client";
import { MyCookie } from "pages/_app";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Style from "styles/subj/prac.module.scss";
import { CostumeData } from "./index";
const Prac_List = gql`
  query($uid: ID!, $mod: String!, $unit: String!, $subj: Int!) {
    practiceList(uid: $uid, mod: $mod, unit: $unit, subj: $subj) {
      pid
      correct
    }
  }
`;
export default function PracList() {
  const cookie = useContext(MyCookie);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  const [listme, { loading, data, refetch }] = useLazyQuery(Prac_List);
  useEffect(() => {
    if (cookie && mod && !loading)
      listme({
        variables: { mod, unit, subj: parseInt(subj), uid: cookie.uid }
      });
  }, [cookie, mod, subj]);
  return (
    <div className={Style.pracList}>
      {data && <Ul prac={data.practiceList} refetch={refetch} />}
      {loading && <ULoading />}
    </div>
  );
}

function ULoading() {
  return (
    <ul className={Style.uLoading}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}

function Ul({ prac, refetch }) {
  const cookie = useContext(MyCookie);
  const { result } = useContext(CostumeData);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  const { setPid } = useContext(CostumeData);
  const [selected, setSelected] = useState(0);
  const selectme = () => {
    for (let i = 0; i < prac.length; i++) if (!prac[i].correct) return i;
    return prac.length - 1;
  };
  useEffect(() => {
    setSelected(selectme);
  }, [prac[0].pid]);
  useEffect(() => {
    if (result) {
      refetch({ mod, unit, subj: parseInt(subj), uid: cookie.uid });
    }
    setPid(prac[selected].pid);
  }, [selected]);
  return (
    <ul className={Style.list}>
      {prac.map((e, i) => (
        <Li
          key={i}
          selected={selected}
          setSelected={setSelected}
          correct={e.correct}
          pid={e.pid}
          index={i}
        />
      ))}
    </ul>
  );
}
function Li({ index, pid, correct, selected, setSelected }) {
  const { setPid } = useContext(CostumeData);
  const TogHandl = () => {
    setSelected(index);
    setPid(pid);
  };
  return (
    <li
      onClick={TogHandl}
      className={
        selected === index
          ? `${Style.selected} ${
              correct
                ? Style.sCorrect
                : correct === false
                ? Style.sInCorrect
                : ""
            }`
          : correct
          ? Style.correct
          : correct === false
          ? Style.incorrect
          : Style.notyet
      }
    >
      {index + 1}
    </li>
  );
}
