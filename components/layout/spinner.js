import { Spinner } from "components/svg/ui";
import Style from "styles/layout/loading.module.scss";
export default function LoadingWithSpinner({ backgroundColor }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor || "none"
      }}
      className={Style.spinner}
    >
      <Spinner />
    </div>
  );
}
