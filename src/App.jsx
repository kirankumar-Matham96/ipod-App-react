import IpodContainer from "./components/IpodContainer";
import appStyles from "./App.module.css";

function App() {
  return (
    <div className={appStyles["bg-container"]}>
      <IpodContainer />
    </div>
  );
}

export default App;
