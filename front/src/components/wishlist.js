import { Segment, SegmentGroup } from 'semantic-ui-react'

function WishList(props) {
    let segments;
    if (props.wishList) {
        segments = props.wishList.map((item) =>  <Segment  >{item}</Segment>);
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