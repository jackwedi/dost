import { Segment, SegmentGroup } from 'semantic-ui-react'

function Groups(props) {
    let segments;
    if (props.list) {
        segments = props.list.map((item, index) =>  <Segment key={index}>{item.pseudo}</Segment>);
    }
    return (
        <div>
        <SegmentGroup >
            <Segment >Groups</Segment>
            <SegmentGroup>
                {segments}
            </SegmentGroup>
        </SegmentGroup>
        </div>

    );
}

export default Groups;