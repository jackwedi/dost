import { Segment, SegmentGroup } from 'semantic-ui-react'

function WishList(props) {
    let segments;
    if (props.list) {
        segments = props.list.map((item, index) =>  <Segment key={index}>{item}</Segment>);
    }
    return (
        <div>
        <SegmentGroup >
            <Segment >Your wishlist :</Segment>
            <SegmentGroup>
                {segments}
            </SegmentGroup>
        </SegmentGroup>
        </div>

    );
}

export default WishList;