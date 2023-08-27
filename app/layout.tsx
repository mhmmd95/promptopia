import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ReactNode } from "react";

export const metadata = {
	title: "Promptopia",
	description: "Discover and share AI prompts",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html>
			<body lang="en">
				<Provider>
					<div className="main">
						<div className="gradiant" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
