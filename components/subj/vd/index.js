import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Style from "styles/subj/vd/vd.module.scss";

const VD = gql`
  query($mod: String!, $unit: String!, $subj: Int!) {
    vd(mod: $mod, unit: $unit, subj: $subj)
  }
`;

export default function Vd() {
  const [vdme, { data }] = useLazyQuery(VD);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  useEffect(() => {
    if (mod && unit && subj)
      vdme({ variables: { mod, unit, subj: parseInt(subj) } });
  }, [subj]);
  return (
    <>
      <section className={Style.vd}>
        <div>
          {data && (
            <>
              <iframe
                src={`https://${window.location.hostname}/embed/${data.vd}`}
                frameBorder="0"
                allowFullScreen
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
