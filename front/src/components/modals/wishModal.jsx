import React from "react";
import { Modal, Header, Message, Form, Input, Button } from "semantic-ui-react";
import axios from "axios";

class WishModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputItem: undefined,
			inputURL: undefined,
			checkingWord: undefined,
			validForm: undefined,
			validItem: undefined,
			validURL: undefined,
		};
	}

	checkInput() {
		const validForm = true;
		this.setState({ validForm });
	}

	onItemChange(ev, data) {
		this.setState({ inputItem: data.value });
	}

	onUrlChange(ev, data) {
		this.setState({ inputURL: data.value });
	}

	async onConfirm() {
		// await this.checkURL();
		await this.checkItem();
		this.setState({ validForm: this.state.validItem && this.state.validURL });
	}

	async checkItem() {
		// Check if a word https://api.dictionaryapi.dev/api/v2/entries/en_US/hello
		if (!this.state.inputItem) return;
		try {
			this.setState({ checkingWord: true });
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, 1000)
			);
			await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/en_US/${this.state.inputItem}`
			);
		} catch (e) {
			console.log("bad word");
			this.setState({ validItem: false, checkingWord: false });
			return;
		} finally {
			this.setState({ checkingWord: false });
		}
		this.setState({ validItem: true });
		this.props.onConfirm(this.state.inputItem, this.state.inputURL);
	}

	async checkURL() {
		return new Promise((resolve) => {
			if (!this.state.urlInput) return true;
			this.setState({ validURL: true }, resolve);
		});
	}

	render() {
		return (
			<Modal
				onClose={() => this.props.onModalStateChange(false)}
				onOpen={() => this.props.onModalStateChange(true)}
				open={this.props.modalOpen}
				size="small"
			>
				<Header size="huge" textAlign="center" content="🙏 NEW WISH 🧧"></Header>
				<Modal.Content>
					<Form error={this.state.validForm === false}>
						<Form.Group widths="equal">
							<Form.Field
								control={Input}
								maxLength="15"
								label="ITEM"
								placeholder="WISH"
								onChange={this.onItemChange.bind(this)}
							/>
							<Form.Field
								control={Input}
								// maxLength="15"
								label="URL LINK (optionnal)"
								placeholder="https://..."
								onChange={this.onUrlChange.bind(this)}
							/>
						</Form.Group>

						<Message
							error
							header="👺 Not a word 👺"
							content="Please specify a correct wish."
						/>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button
						loading={this.state.checkingWord}
						// color={this.state.validForm ? "green" : "black"}
						color="green"
						disabled={!this.state.inputItem}
						onClick={this.onConfirm.bind(this)}
					>
						Confirm
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default WishModal;
