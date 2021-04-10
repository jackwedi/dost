import React from "react";
import { Modal, Header, Message, Form, Input, Select, Button } from "semantic-ui-react";
import axios from "axios";

class JoinGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: undefined, validForm: undefined };
    }

    async checkInput() {
        let validForm = this.state.input.match(/^[a-z0-9À-ÿ#]+$/gi) ?? false;
        validForm = validForm;
        console.log(this.state.input, validForm)
        this.setState({ validForm });
    }

    onInputChange(ev, data) {
        this.setState( {input: data.value}, () => {
            this.checkInput();
        });
    }

    async onConfirm() {
        if (!await this.groupExists(this.state.input)) {
            this.setState({ validForm: false });
            return;
        }
        const res = await this.props.onConfirm(this.state.input);
    }

    async groupExists(groupId) {
        const request = await axios.get(`http://localhost:1337/group/${groupId.replace("#", "~")}`);
        return request.data;
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
                🙋‍♀️ Join Group 🙋‍♂️
                </Header>
                <Modal.Content>
                    <p>Please specify your group id :</p>
                    <Form error={this.state.validForm === false} >
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                maxLength='21'
                                label='GROUP ID'
                                placeholder='GROUP ID'
                                onChange={this.onInputChange.bind(this)}
                            />
                        </Form.Group>

                        <Message
                        error
                        header='Wrong group name👺'
                        content='Please specify a correct group id.'
                        />
                    </Form>

                </Modal.Content>
                <Modal.Actions>
                <Button  icon= 'search' color= {this.state.validForm ? 'green' : 'black'} disabled={!this.state.validForm} onClick={this.onConfirm.bind(this)}>
                </Button>
                </Modal.Actions>
            </Modal>)
    }
}

export default JoinGroupModal;