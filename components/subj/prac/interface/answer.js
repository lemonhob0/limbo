import { CostumeData } from "../index";
import { ChangeAnswer } from "./index";
import { useContext, useState, useEffect } from "react";
import Style from "styles/subj/prac.module.scss";

export default function Answer({ content }) {
  const { catie, index } = content;
  const { setExpectedLength } = useContext(CostumeData);
  useEffect(() => {
    setExpectedLength(index);
  }, []);
  if (catie === "yesNo") return <YesNo index={index} />;
}

function YesNo({ index }) {
  const [answer, setAnswer] = useState(undefined);
  const { setAnswers, answers } = useContext(ChangeAnswer);
  const { result } = useContext(CostumeData);
  const Answerhandler = state => {
    if (!result) {
      setAnswer(state);
      setAnswers(arr => {
        arr[index] = state;
        return arr;
      });
    }
  };

  if (answers.length === 0 && answer !== undefined) setAnswer(undefined);
  return (
    <div className={Style.yesNo}>
      <button
        className={
          answer === false
            ? result
              ? result.correction[index] === answers[index]
                ? Style.correct
                : Style.incorrect
              : Style.selected
            : ""
        }
        onClick={() => Answerhandler(false)}
      >
        لا
      </button>
      <button
        className={
          answer
            ? result
              ? result.correction[index] === answers[index]
                ? Style.correct
                : Style.incorrect
              : Style.selected
            : ""
        }
        onClick={() => Answerhandler(true)}
      >
        نعم
      </button>
    </div>
  );
}
