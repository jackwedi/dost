import "./App.css";
import Main from "./components/main.jsx";
import { Route, BrowserRouter as Router, Link, Switch, Home } from "react-router-dom";
import Groups from "./components/groups";

function App() {
	return (
		<Router>
			<Main />
		</Router>
	);
}

export default App;
