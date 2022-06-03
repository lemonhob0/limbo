import Style from "styles/app/index.module.scss";
import ModFind from "components/app/form";
import { useState, useEffect, useContext } from "react";
import ModList from "components/app/list";
import { gql, useLazyQuery } from "@apollo/client";
import { MyCookie } from "pages/_app";
const FIND_COURS = gql`
  query Query($uid: ID!, $find: String) {
    findCours(uid: $uid, find: $find) {
      mod
      ban
      sub
      progress
    }
  }
`;
export default function App() {
  const [find, setFind] = useState("");
  const cookie = useContext(MyCookie);
  const [findme, { data, loading }] = useLazyQuery(FIND_COURS);

  useEffect(() => {
    if (cookie) {
      if (find) findme({ variables: { uid: cookie.uid, find } });
      else findme({ variables: { uid: cookie.uid, find } });
    }
  }, [find, cookie]);

  return (
    <main className={Style.main}>
      <p className="ar" dir="rtl">
        مرحبا بك !
      </p>
      <section>
        <ModFind loading={loading} find={find} setFind={setFind} />
        <ModList data={data} find={find} />
      </section>
    </main>
  );
}
