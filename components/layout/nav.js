import Logo, { HomeLogo, LogoutLogo, UnitCube } from "components/svg/ui";
import Style from "styles/layout/nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Nav() {
  const router = useRouter();
  const { mod, unit } = router.query;
  return (
    <nav className={Style.nav}>
      <div>
        <Link href="/app">
          <div>
            <Logo />
          </div>
        </Link>
        <ul>
          <Link href={unit ? `/${mod}` : "/app"}>
            <li>{unit ? <UnitCube /> : <HomeLogo />}</li>
          </Link>
          <li
            onClick={() => {
              document.cookie =
                "uid=1354;expires=Thu, 01 Jan 1970 00:00:01 GMT";

              location = "/";
            }}
          >
            <LogoutLogo />
          </li>
        </ul>
      </div>
    </nav>
  );
}
