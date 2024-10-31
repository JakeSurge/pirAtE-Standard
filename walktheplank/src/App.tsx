import { BlackPearl } from "./BlackPearl";
import piratebg from "./piratebg.jpeg";

function App() {
  const appStyle = {
    backgroundImage: `url(${piratebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={appStyle}>
      <BlackPearl />
    </div>
  );
}

export default App;
