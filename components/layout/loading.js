import Logo from "components/svg/ui";
import Style from "styles/layout/loading.module.scss";
import { useState, useEffect, useContext } from "react";
import { MyCookie } from "pages/_app";
import { useRouter } from "next/router";
import { gql, useLazyQuery } from "@apollo/client";

const CHECK = gql`
  query($uid: ID!) {
    check(uid: $uid)
  }
`;

export default function Loading() {
  const [checkme, { data }] = useLazyQuery(CHECK);
  const cookie = useContext(MyCookie);
  const router = useRouter();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (data) {
      if (data.check) {
        if (router.asPath === "/") router.replace("/app");
      } else router.replace("/");
      if (load) {
        let timeout = setTimeout(() => {
          setLoad(false);
        }, 2000);
        return () => {
          clearTimeout(timeout);
        };
      }
    } else if (cookie) checkme({ variables: { uid: cookie.uid } });
    else if (!cookie) {
      let timeout = setTimeout(() => {
        setLoad(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [cookie, data]);

  return (
    <div className={load ? Style.loading : Style.none}>
      <Logo />
    </div>
  );
}
