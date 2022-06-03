import Vd from "components/subj/vd";
import Style from "styles/subj/index.module.scss";
import SubjContent from "components/subj/content";
import Prac from "components/subj/prac";
export default function Subj() {
  return (
    <>
      <Vd />
      <main className={Style.main}>
        <SubjContent />
        <Prac />
      </main>
    </>
  );
}
