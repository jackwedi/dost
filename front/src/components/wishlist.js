import { Segment, SegmentGroup } from 'semantic-ui-react'
import { Input, Label } from 'semantic-ui-react'
import React from "react";

function WishList(props) {

    let segments;
    if (props.list) {
        segments = props.list.map((item, index) =>  <Segment key={index} >
            {item}
        </Segment>);
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
            <Input placeholder='Add wish...' onChange={(ev, data) => inputItem = data.value}
                action={{
                    onClick: () => props.addItem(inputItem),
                    color: props.validInput ? 'teal' : 'red',
                    icon: 'plus',
                }}
            />

            {!props.validInput && 
                <Label color='red' pointing prompt>
                Your password must be 6 characters or more
            </Label>
            }
            </Segment>
        </SegmentGroup>
            

        </div>

    );
}

export default WishList;