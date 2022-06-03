import { useLazyQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { useRouter } from "next/router";
import { MyCookie } from "pages/_app";
import ModProgress from "components/mod/progress";
import Style from "styles/mod/index.module.scss";
import LoadingWithSpinner from "components/layout/spinner";
import UnitList from "components/mod/list";
const UNIT = gql`
  query($uid: ID!, $mod: String!) {
    modProgress(uid: $uid, mod: $mod) {
      progress
      ban
    }
    units(uid: $uid, mod: $mod) {
      unit
      progress
    }
  }
`;

export default function Mod() {
  const cookie = useContext(MyCookie);
  const router = useRouter();
  const { mod } = router.query;
  const [unitme, { data, loading }] = useLazyQuery(UNIT);
  if (!data && !loading && cookie && mod)
    unitme({ variables: { uid: cookie.uid, mod } });
  if (data && data.modProgress === null) router.replace("/app");
  return (
    <>
      <main className={Style.main}>
        {data && data.units ? (
          <>
            <ModProgress modP={data.modProgress} />
            <UnitList units={data.units} />
          </>
        ) : (
          loading && <LoadingWithSpinner />
        )}
      </main>
    </>
  );
}
