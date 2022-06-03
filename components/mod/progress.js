import { useRouter } from "next/router";
import { ModIcon } from "components/svg/ui";
import Progress from "components/layout/progress";
export default function ModProgress({ modP }) {
  const router = useRouter();
  const { mod } = router.query;

  return (
    <article>
      <ModIcon ban={modP.ban} />
      <h1 className="en">{mod}</h1>
      <Progress
        color={modP.progress === 100 ? "purple" : null}
        height={"2em"}
        progress={modP.progress}
      />
    </article>
  );
}
