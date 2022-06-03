import Style from "styles/app/index.module.scss";

export default function ModList({ find, data }) {
  return (
    <>
      {data && (
        <>
          {data.findCours.length > 0 ? (
            <>
              <ul className={find ? Style.focus : ""}>
                {data.findCours.map((e, i) => (
                  <Card key={i} obj={e} />
                ))}
              </ul>
            </>
          ) : (
            <h1 className="ar">
              <span className="en">"{find}"</span>, غير موجود !
            </h1>
          )}
        </>
      )}
    </>
  );
}

import Link from "next/link";
import Progress from "components/layout/progress";

function Card({ obj }) {
  return (
    <>
      <Link href={`/${obj.mod}`}>
        <li className={obj.progress === 100 ? Style.done : "notyet"}>
          <Banner ban={obj.ban} />
          <article>
            <h1 className="en">{obj.mod}</h1>
            <p className="ar">{obj.sub || "لنكمل التعلم !"}</p>
            <Progress
              color={obj.progress === 100 ? "purple" : "blue"}
              progress={obj.progress}
              height={"60%"}
            />
          </article>
        </li>
      </Link>
    </>
  );
}

function Banner({ ban }) {
  return (
    <div
      style={{
        backgroundImage: ban ? `url('/${ban}.webp')` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    ></div>
  );
}
