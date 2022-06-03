import MainLogo from "./logo.svg";
export default function Logo() {
  return <MainLogo />;
}

import HomeSVG from "./home.svg";
export function HomeLogo() {
  return <HomeSVG />;
}
import LogoutSVG from "./logout.svg";

export function LogoutLogo() {
  return <LogoutSVG />;
}

import UnitSVG from "components/svg/unit.svg";

export function UnitCube() {
  return <UnitSVG />;
}

import ReactIcon from "./icons/react.svg";
import VueIcon from "./icons/vue.svg";
import AngularIcon from "./icons/angular.svg";

export function ModIcon({ ban }) {
  return ban === "react" ? (
    <ReactIcon />
  ) : ban === "vue" ? (
    <VueIcon />
  ) : (
    <AngularIcon />
  );
}

import PlayIcon from "./videos/play.svg";
import PauseIcon from "./videos/pause.svg";
import VolumeIcon from "./videos/volume.svg";
import FullScreenIn from "./videos/fullscreenin.svg";
import FullScreenOut from "./videos/fullscreenout.svg";
import SpinnerIcon from "./videos/spinner.svg";

export function PlayBtn() {
  return <PlayIcon />;
}
export function PauseBtn() {
  return <PauseIcon />;
}
export function VolumeBtn() {
  return <VolumeIcon />;
}
export function FullScreenInBtn() {
  return <FullScreenIn />;
}
export function FullScreenOutBtn() {
  return <FullScreenOut />;
}

export function Spinner() {
  return <SpinnerIcon />;
}

import MathSvg from "./test/math.svg";

export function MathIcon() {
  return <MathSvg />;
}
