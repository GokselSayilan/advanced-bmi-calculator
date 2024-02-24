import BmiApp from "./Components/BmiApp/BmiApp";
import { BmiProvider } from "./Context/BmiContext";

function App() {
  return (
    <div>
      <BmiProvider>
        <BmiApp />
      </BmiProvider>
    </div>
  );
}

export default App;
