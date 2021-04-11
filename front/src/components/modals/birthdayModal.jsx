import React from "react";
import {
  Modal,
  Header,
  Message,
  Form,
  Input,
  Select,
  Button,
} from "semantic-ui-react";

const months = [
  { key: "jan", text: "January", value: "January" },
  { key: "feb", text: "February", value: "February" },
  { key: "mar", text: "March", value: "March" },
  { key: "apr", text: "April", value: "April" },
  { key: "may", text: "May", value: "May" },
  { key: "jun", text: "June", value: "June" },
  { key: "jul", text: "July", value: "July" },
  { key: "aug", text: "August", value: "August" },
  { key: "sep", text: "September", value: "September" },
  { key: "oct", text: "October", value: "October" },
  { key: "nov", text: "November", value: "November" },
  { key: "dec", text: "December", value: "December" },
];

class BirthdayModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: null,
      day: null,
      year: null,
      validDay: null,
      validYear: null,
      validForm: null,
      futureDOB: null,
    };
  }

  get parsedDay() {
    return parseInt(this.state.day, 10);
  }

  get parsedYear() {
    return parseInt(this.state.year, 10);
  }

  checkInput() {
    const incorrectDay =
      isNaN(this.parsedDay) ||
      !isFinite(this.state.day) ||
      this.state.day.length > 2 ||
      this.parsedDay > 31 ||
      !this.parsedDay;
    const incorrectYear =
      isNaN(this.parsedYear) ||
      !isFinite(this.state.year) ||
      this.state.year.length !== 4;

    let validForm = !incorrectYear && !incorrectDay && this.state.month;

    let futureDOB = null;
    if (validForm) {
      try {
        const computedDate = new Date(
          `${this.state.month} ${this.parsedDay}, ${this.parsedYear}`
        );
        const now = new Date(Date.now());
        validForm = validForm && computedDate < now;
        futureDOB = !(computedDate < now);
      } catch (e) {
        console.log("CANT PRODUCE DATE");
      }
    }
    this.setState({
      validDay: !incorrectDay,
      validYear: !incorrectYear,
      validForm,
      futureDOB,
    });
  }

  onMonthChange(ev, data) {
    this.setState({ month: data.value }, () => {
      this.checkInput();
    });
  }

  onDayChange(ev, data) {
    this.setState({ day: data.value }, () => {
      this.checkInput();
    });
  }

  onYearChange(ev, data) {
    this.setState({ year: data.value }, () => {
      this.checkInput();
    });
  }

  onConfirm() {
    if (this.state.validForm) {
      this.props.onConfirm(
        new Date(`${this.state.month} ${this.parsedDay}, ${this.parsedYear}`)
      );
    }
  }

  render() {
    return (
      <Modal
        onClose={() => this.props.onModalStateChange(false)}
        onOpen={() => this.props.onModalStateChange(true)}
        open={this.props.modalOpen}
        size="small"
        closeOnDimmerClick={false}
        closeOnEscape={false}
      >
        <Header size="huge" textAlign="center">
          ✨ Birthday ✨
        </Header>
        <Modal.Content>
          <p>Please specify your date of birth :</p>
          <Form error={this.state.futureDOB}>
            <Form.Group widths="equal">
              <Form.Field
                control={Select}
                options={months}
                label="MONTH"
                placeholder="MONTH"
                onChange={this.onMonthChange.bind(this)}
              />
              <Form.Field
                control={Input}
                label="DAY (DD)"
                placeholder="DD"
                onChange={this.onDayChange.bind(this)}
                error={this.state.validDay !== null && !this.state.validDay}
              />
              <Form.Field
                control={Input}
                label="YEAR (YYYY)"
                placeholder="YYYY"
                onChange={this.onYearChange.bind(this)}
                error={this.state.validYear !== null && !this.state.validYear}
              />
            </Form.Group>

            <Message
              error
              header="Wrong birthday 👺"
              content="Please specify a correct date. (This one is in the future)"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color={this.state.validForm ? "green" : "black"}
            disabled={!this.state.validForm}
            onClick={this.onConfirm.bind(this)}
          >
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default BirthdayModal;
