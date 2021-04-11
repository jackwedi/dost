import React from "react";
import { Modal, Header, Message, Form, Input, Button } from "semantic-ui-react";

class WishModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: undefined, validForm: undefined };
    }

    checkInput() {
        const validForm = this.state.input.match(/^[a-z0-9À-ÿ]+$/gi) ?? false;
        this.setState({ validForm });
    }

    onInputChange(ev, data) {
        this.setState( {input: data.value}, () => {
            this.checkInput();
        });
    }

    onConfirm() {
        this.props.onConfirm(this.state.input);
    }

    render() {
        return (
            <Modal
                onClose={() => this.props.onModalStateChange(false)}
                onOpen={() => this.props.onModalStateChange(true)}
                open={this.props.modalOpen}
                size='small'
            >
                <Header size='huge' textAlign='center'>
                💃 New Group 🕺
                </Header>
                <Modal.Content>
                    <p>Please specify your group name :</p>
                    <Form error={this.state.validForm === false} >
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                maxLength='15'
                                label='NAME (max 15 alphanumeric characters)'
                                placeholder='NAME'
                                onChange={this.onInputChange.bind(this)}
                            />
                        </Form.Group>

                        <Message
                        error
                        header='Wrong group name👺'
                        content='Please specify a correct group name. (Only alphanumeric characters)'
                        />
                    </Form>

                </Modal.Content>
                <Modal.Actions>
                <Button color= {this.state.validForm ? 'green' : 'black'} disabled={!this.state.validForm} onClick={this.onConfirm.bind(this)}>
                    Confirm
                </Button>
                </Modal.Actions>
            </Modal>)
    }
}

export default WishModal;