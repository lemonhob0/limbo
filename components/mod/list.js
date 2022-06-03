import { useRouter } from "next/router";
import { UnitCube } from "components/svg/ui";
import Link from "next/link";
import Progress from "components/layout/progress";
import Style from "styles/mod/index.module.scss";
export default function UnitList({ units }) {
  return (
    <>
      <ul>
        {units.map((e, i) => (
          <Card unit={e.unit} progress={e.progress} key={i} />
        ))}
      </ul>
    </>
  );
}

function Card({ unit, progress }) {
  const router = useRouter();
  const { mod } = router.query;

  return (
    <>
      <Link href={`/${mod}/${unit}/0`}>
        <li className={progress === 100 ? Style.done : ""}>
          <UnitCube />
          <h1 className="en">{unit}</h1>
          <Progress
            color={progress === 100 ? "purple" : null}
            progress={progress}
            height={`100%`}
          />
        </li>
      </Link>
    </>
  );
}
