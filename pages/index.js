import AuthForm from "components/auth/form";
import Style from "styles/auth/index.module.scss";
import AuthInfo from "components/auth/info";
export default function Auth() {
  return (
    <main className={Style.auth}>
      <AuthForm />
      <AuthInfo />
    </main>
  );
}
