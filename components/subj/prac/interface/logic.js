import Answer from "./answer";
import Style from "styles/subj/prac.module.scss";
export default function Logic({ obj }) {
  const { content, type } = obj;
  if (type === "text") return <Text text={content.text} />;
  if (type === "img") return <PracImg url={content.url} />;
  if (type === "answer")
    return (
      <div className={Style.answer}>
        <Answer content={content} />
      </div>
    );
}

function Text({ text }) {
  return (
    <div className={Style.text}>
      <p>{text}</p>
    </div>
  );
}
function PracImg({ url }) {
  return (
    <div className={Style.pracImg}>
      <img src={`https://drive.google.com/uc?export=download&id=${url}`} />
    </div>
  );
}
