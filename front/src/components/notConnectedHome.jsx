import { Tween } from "react-gsap";
import { Container, Grid, Icon } from "semantic-ui-react";

function NotConnectedHome(props) {
	return (
		<Grid.Row>
			<Container style={{ paddingTop: 6.5 + "em" }} textAlign="right" fluid>
				<Tween from={{ x: -0.5 + "em", y: 0 }} to={{ x: -0.5 + "em", y: -0.5 + "em" }} duration={1} repeat={-1} yoyo>
					<div>
						<Icon name="arrow down" key="arrowIcon" flipped="vertically" size="huge"></Icon>
					</div>
				</Tween>
			</Container>
		</Grid.Row>
	);
}

export default NotConnectedHome;
