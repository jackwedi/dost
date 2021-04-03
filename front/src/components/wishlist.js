import { Input, Label, Dimmer, Loader, Segment, SegmentGroup, Button, Table, Header, List } from 'semantic-ui-react'
import React from "react";
import axios from 'axios';

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogged: false, validInput: true, inputItem: null, checkingWord: false };
    }

    async checkItem() {
        // Check if a word https://api.dictionaryapi.dev/api/v2/entries/en_US/hello
        if (!this.state.inputItem) return;
        try {
            this.setState({checkingWord: true});
            await new Promise(resolve => setTimeout(() => {resolve()}, 1000));
            await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${this.state.inputItem}`);
        } catch(e) {
            console.log("bad word");
            this.setState({validInput: false, checkingWord: false});
            return;
        } finally {
            this.setState({checkingWord: false});
        }
        this.setState({validInput: true});
        this.props.addItem(this.state.inputItem)
    }

    onInputChange(value) {
        this.setState({inputItem: value, validInput: true});
    }

    onRemoveItem(value) {
        this.props.removeItem(this.props.list[value]);
    }

    render() {
        let segments;
        if (this.props.list) {
            segments = this.props.list.map((item, index) =>  {
                return (
                    <Table.Row>

                    <Table.Cell collapsing>                    
                        <Button size='tiny' inverted color='red' icon='remove' circular onClick={ (ev, data) => this.onRemoveItem(index)}></Button>
                    </Table.Cell>
                    <Table.Cell>{item}</Table.Cell>
                    </Table.Row>
                );
            });
        }

        return (
            <div>
                <SegmentGroup >
                    <Segment >
                        <Header>WISHLIST</Header>
                    </Segment>
                    <Segment>

                    <Table compact >
                            {segments}
                    </Table>
                    </Segment>
                    <Segment>
                        {this.state.checkingWord && 
                            <Dimmer active>
                                <Loader> Adding </Loader>
                            </Dimmer>
                        }

                        <Input placeholder='Add wish...' onChange={(ev, data) => this.onInputChange(data.value)}
                            action={{
                                onClick: () => this.checkItem(),
                                color: this.state.validInput ? 'teal' : 'red',
                                icon: 'plus'
                            }}
                        >

                        </Input>
                    </Segment>
                </SegmentGroup>
                {!this.state.validInput && 
                    <Label color='red' pointing>
                        👺 Not a word 👺
                    </Label>
                }
            </div>
    
        );
    }

}

export default Wishlist;