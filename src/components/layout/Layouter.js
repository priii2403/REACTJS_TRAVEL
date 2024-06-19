import "./Layout.css";
import MainNavigatation from "./MainNavigatation";

function Layouter(props) {
  return (
    <div>
      <MainNavigatation />
      <main className="main">{props.children}</main>
    </div>
  );
}
export default Layouter;
