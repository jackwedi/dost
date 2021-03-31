import { Segment, SegmentGroup } from 'semantic-ui-react'
import { Button, Icon, Modal, Input, Header } from 'semantic-ui-react'
import React from "react";

function WishList(props) {
    const [open, setOpen] = React.useState(false);

    let segments;
    if (props.list) {
        segments = props.list.map((item, index) =>  <Segment key={index}>{item}</Segment>);
    }

    let inputItem = null;
    return (
        <div>
        <SegmentGroup >
            <Segment >Wishlist</Segment>
            <SegmentGroup>
                {segments}
            </SegmentGroup>

            <Segment >
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={ 
                    // <Button animated onClick={() => props.addItem("Test")}>
                    <Button animated>
                        <Button.Content visible>ADD</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus' />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Content>
                    <Modal.Description>
                    <Header>Add an item to your wishlist</Header>
                    {/* <p>
                        Enter the item name to add to the wish list.
                    </p> */}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Input placeholder="Item..." tiny onChange={(ev, data) => inputItem = data.value}/>
                    <Button
                    content="Add"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => {
                        setOpen(false);
                        props.addItem(inputItem);
                    }}
                    positive
                    />
                </Modal.Actions>
            </Modal>
            </Segment>

        </SegmentGroup>


        </div>

    );
}

export default WishList;