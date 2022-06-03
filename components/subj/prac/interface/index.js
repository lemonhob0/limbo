import { gql, useQuery, useMutation } from "@apollo/client";
import { MyCookie } from "pages/_app";
import { useEffect, useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
import LoadingWithSpinner from "components/layout/spinner";
import { CostumeData } from "../index";
import Style from "styles/subj/prac.module.scss";
import Logic from "./logic";

export const ChangeAnswer = createContext();
const Prac_InterFace = gql`
  query($pid: ID!) {
    practice(pid: $pid) {
      type
      content {
        catie
        index
        url
        text
      }
    }
  }
`;
const Send_Answers = gql`
  mutation(
    $uid: ID!
    $mod: String!
    $unit: String!
    $subj: Int!
    $prac: ID!
    $answers: [AnyType!]!
  ) {
    updateUserProgress(
      uid: $uid
      mod: $mod
      unit: $unit
      subj: $subj
      prac: $prac
      answers: $answers
    ) {
      result
      correction
      url
    }
  }
`;
export default function Interface({ pid }) {
  const { loading, data } = useQuery(Prac_InterFace, { variables: { pid } });

  const [answers, setAnswers] = useState([]);
  const { setResult } = useContext(CostumeData);
  const [loadMe, setLoadMe] = useState(false);
  const [updatme] = useMutation(Send_Answers, {
    onCompleted: data => {
      setLoadMe(false);
      if (data.updateUserProgress)
        setResult({ ...data.updateUserProgress, pid });
    }
  });
  const router = useRouter();
  const { subj } = router.query;
  useEffect(() => {
    setResult(undefined);
    setAnswers([]);
  }, [pid, subj]);
  return (
    <>
      <div className={Style.interface}>
        {loading && <LoadingWithSpinner />}
        {data && data.practice && (
          <ChangeAnswer.Provider value={{ answers, setAnswers }}>
            {data.practice.map((e, i) => (
              <Logic key={i} obj={e} />
            ))}
            <SendAnswers
              pid={pid}
              updatme={updatme}
              loadMe={loadMe}
              setLoadMe={setLoadMe}
            />
          </ChangeAnswer.Provider>
        )}
      </div>
    </>
  );
}

function SendAnswers({ pid, updatme, loadMe, setLoadMe }) {
  const { answers } = useContext(ChangeAnswer);
  const { uid } = useContext(MyCookie);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  const { result, setResult, expectedLength } = useContext(CostumeData);
  const [msg, setMsg] = useState(null);
  const sendMsg = () => {
    setMsg("رجاءا اجب على كل الاسئلة");
    let timout = setTimeout(() => {
      setMsg(null);
    }, 1000);
    return () => {
      clearTimeout(timout);
    };
  };
  const formHandler = e => {
    e.preventDefault();
    if (loadMe) return;
    if (!result) {
      if (answers.length === 0) return sendMsg();
      for (let i = 0; i < answers.length; i++)
        if (answers[i] === undefined || answers.length !== expectedLength + 1)
          return sendMsg();
      if (answers.length === expectedLength + 1) {
        setLoadMe(true);
        updatme({
          variables: {
            uid,
            answers,
            mod,
            unit,
            subj: parseInt(subj),
            prac: pid
          }
        });
      }
    } else {
      setResult(undefined);
    }
  };

  return (
    <>
      <form className={Style.sendAnswers} onSubmit={formHandler}>
        {msg && <p>{msg}</p>}
        <div>
          <ShowSolution url={result && result.url} />
          <button
            className={
              result ? (result.result ? Style.correct : Style.incorrect) : ""
            }
            type={loadMe ? "button" : "submit"}
          >
            {loadMe
              ? "جاري التحقق..."
              : result
              ? result.result
                ? "اسطورة ^_^"
                : "حاول مرة اخرى :("
              : "تحقق من الاجوبة"}
          </button>
        </div>
      </form>
    </>
  );
}
function ShowSolution({ url }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (url)
          window.open(`https://drive.google.com/file/d/${url}/view`, "_blank");
      }}
      className={url ? Style.showAnswer : Style.noAnswerYet}
    >
      اضهر الحلول
    </button>
  );
}
