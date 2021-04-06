import React from "react";
import { Modal, Header, Icon, Form, Input, Select, Button } from "semantic-ui-react";

const months = [
    { key: 'jan', text: 'January', value: 'January' },
    { key: 'feb', text: 'February', value: 'February' },
    { key: 'mar', text: 'March', value: 'March' },
    { key: 'apr', text: 'April', value: 'April' },
    { key: 'may', text: 'May', value: 'May' },
    { key: 'jun', text: 'June', value: 'June' },
    { key: 'jul', text: 'July', value: 'July' },
    { key: 'aug', text: 'August', value: 'August' },
    { key: 'sep', text: 'September', value: 'September' },
    { key: 'oct', text: 'October', value: 'October' },
    { key: 'nov', text: 'November', value: 'November' },
    { key: 'dec', text: 'December', value: 'December' },
];


class BirthdayModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { month: null, day: null, year: null, validDay: null, validYear: null, validForm: null };
    }

    get parsedDay() {
        return parseInt(this.state.day);
    }

    get parsedYear() {
        return  parseInt(this.state.year);
    }

    checkInput() {
        const incorrectDay = isNaN(this.parsedDay) || this.state.day.length > 2 || this.parsedDay > 31 || !this.parsedDay;
        const incorrectYear = isNaN(this.parsedYear) || this.state.year.length !== 4 || !this.parsedYear;
        let validForm = !incorrectYear && !incorrectDay && this.state.month;
        
        if (validForm) {
            try {
                const computedDate = new Date(`${this.state.month} ${this.parsedDay}, ${this.parsedYear}`);
                const now = Date.now();
                validForm = validForm && (computedDate < now);
                console.log(validForm)
            } catch (e) {
                console.log("CANT PRODUCE DATE")
            }
        }
        this.setState({validDay: !incorrectDay, validYear:!incorrectYear, validForm });

    }

    onMonthChange(ev, data) {
        this.setState({month: data.value}, () => {
            this.checkInput();
        });
    }

    onDayChange(ev, data) {
        this.setState({day: data.value}, () => {
            this.checkInput();
        });
    }

    onYearChange(ev, data) {
        this.setState({year: data.value}, () => {
            this.checkInput();
        });
    }

    onConfirm() {
        if (this.state.validForm) {
            this.props.onConfirmDOB(new Date(`${this.state.month} ${this.parsedDay}, ${this.parsedYear}`))
        }
    }

    render() {
        return (
            <Modal
                onClose={() => this.props.onModalStateChange(false)}
                onOpen={() => this.props.onModalStateChange(true)}
                open={this.props.modalOpen}
                size='small'
                closeOnDimmerClick={false}
                closeOnEscape={false}
            // trigger={<Button>Basic Modal</Button>}
            >
                <Header icon>
                <Icon name='users' circular />

                </Header>
                <Modal.Content>
                    <p>Please specify your birthday </p>
                    <Form id="test2" >
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Select}
                                options={months}
                                label='MONTH'
                                placeholder='MONTH'
                                onChange={this.onMonthChange.bind(this)}
                            />
                            <Form.Field
                                control={Input}
                                label='DAY (DD)'
                                placeholder='DD'
                                onChange={this.onDayChange.bind(this)}
                                error= {!this.state.validDay || !this.state.validForm}
                            />
                            <Form.Field
                                control={Input}
                                label='YEAR (YYYY)'
                                placeholder='YYYY'
                                onChange={this.onYearChange.bind(this)}
                                error= {!this.state.validYear || !this.state.validForm}
                            />

                        </Form.Group>
                    </Form>

                </Modal.Content>
                <Modal.Actions>
                <Button color='black' disabled={!this.state.validForm} onClick={this.onConfirm.bind(this)}>
                    Confirm
                </Button>
                </Modal.Actions>
            </Modal>)
    }
}

export default BirthdayModal;