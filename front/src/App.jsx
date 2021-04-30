import "./App.css";
import Main from "./components/main.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<Main />
		</Router>
	);
}

export default App;
