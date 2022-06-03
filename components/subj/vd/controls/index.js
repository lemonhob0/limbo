import DesktopControls from "./desktop";
import MobileControls from "./mobile";

export default function Controls({ myVdContainer, player }) {
  return (
    <>
      {window.innerWidth >= 986 ? (
        <DesktopControls videoContainer={myVdContainer} player={player} />
      ) : (
        <MobileControls videoContainer={myVdContainer} player={player} />
      )}
    </>
  );
}
