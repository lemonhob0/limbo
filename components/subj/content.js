import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { MyCookie } from "pages/_app";
import Style from "styles/subj/content.module.scss";
import Link from "next/link";
import { PlayBtn } from "components/svg/ui";
import Head from "next/head";
const SUBJ_LIST = gql`
  query($mod: String!, $unit: String!, $uid: ID!) {
    subjList(mod: $mod, unit: $unit, uid: $uid) {
      title
      done
    }
  }
`;
export default function Content() {
  const router = useRouter();
  const cookie = useContext(MyCookie);
  const { mod, unit, subj } = router.query;
  const [subjme, { data, loading }] = useLazyQuery(SUBJ_LIST);
  useEffect(() => {
    if (subj && !loading) subjme({ variables: { mod, unit, uid: cookie.uid } });
  }, [subj]);
  if (data && !data.subjList) router.replace("/app");
  return (
    <section className={Style.content}>
      {data && data.subjList && (
        <>
          <Info
            subj={parseInt(subj)}
            title={data.subjList[parseInt(subj)].title}
            length={data.subjList.length - 1}
            mod={mod}
            unit={unit}
          />
          <List eps={data.subjList} subj={subj} mod={mod} unit={unit} />
        </>
      )}
    </section>
  );
}

function Info({ subj, title, length, mod, unit }) {
  return (
    <>
      <Head>
        <title>{title + " - " + unit}</title>
      </Head>
      <h1 className="ar">{title}</h1>
      <div className={Style.info}>
        {subj !== length && (
          <Link scroll={false} href={`/${mod}/${unit}/${subj + 1}`}>
            <button className={Style.next}>
              <span>{`<<`}</span> التالي
            </button>
          </Link>
        )}
        {subj !== 0 && (
          <Link scroll={false} href={`/${mod}/${unit}/${subj - 1}`}>
            <button className={Style.prv}>
              السابق <span>{`>>`}</span>
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

function List({ eps, mod, unit, subj }) {
  return (
    <div className={Style.list}>
      <p>دروس</p>
      <ul>
        {eps.map((e, i) => {
          return (
            <Link scroll={false} key={i} href={`/${mod}/${unit}/${i}`}>
              <li
                className={
                  i == subj ? Style.select : e.done ? Style.done : Style.yet
                }
              >
                <p className="ar">{e.title}</p>
                {i == subj && <PlayBtn />}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
