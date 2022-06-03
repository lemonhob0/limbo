import Style from "styles/layout/error.module.scss";
export default function Und() {
  return (
    <main className={Style.error}>
      <h1 className="ar">
        <span> 404 </span>... Page Not Found :)
      </h1>
      <p className="ar">stop messing with the Url</p>
    </main>
  );
}
