import React from "react";
import {
  Segment,
  SegmentGroup,
  Select,
  Item,
  Icon,
  Button,
  Header,
  Card,
  Grid,
} from "semantic-ui-react";

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroupIndex: null };
  }

  async onSelectGroup(data) {
    await this.props.updateUI();
    this.setState({ selectedGroupIndex: data.value });

  }

  sortByNextDate(tab) {
    return (
      tab
        // Add 1 year to the already passed birthday of this year
        .map((member) => {
          let tempMember = { ...member };
          let birthday = new Date(member.dateOfBirth);
          let today = new Date(Date.now());

          let computedBirthday = birthday.getDate() + birthday.getMonth() * 30;
          let computedToday = today.getDate() + today.getMonth() * 30;
          if (computedBirthday - computedToday < 0) {
            birthday = new Date(birthday.setFullYear(today.getFullYear() + 1));
          }
          tempMember.dateOfBirth = birthday;
          return tempMember;
        })
        // Sort by next birthdates
        .sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
    );
  }

  upcomingDate(rawDate) {
    const date = new Date(rawDate);
    const today = new Date(Date.now());
    const monthOffset = 1;

    return (today.getFullYear() === date.getFullYear()) && ((today.getMonth() + monthOffset) - date.getMonth() <= 1 )
  }

  groupSelectionElement(groups) {
    return (
      <Segment secondary>
        <Grid columns='equal' verticalAlign='middle'>
          <Grid.Row centered>
            <Select
              placeholder="Select your group"
              options={groups}
              onChange={(ev, data) => this.onSelectGroup(data)}
            />
          </Grid.Row>
          <Grid.Row centered>
            {this.state.selectedGroupIndex !== null &&
              <Card
              header={this.props.list[this.state.selectedGroupIndex]?.pseudo} 
              description={`${this.props.list[this.state.selectedGroupIndex]?.members.length} members`}
              meta={this.props.list[this.state.selectedGroupIndex]?.sharedId}
              />
            }
          </Grid.Row>
        </Grid>
        {this.membersSegments()}
      </Segment>
    );
  }

  membersSegments() {
    let segments = [];

    if (this.props.list && this.state.selectedGroupIndex !== null) {
      // Removes the current User
      let members = this.props.list[this.state.selectedGroupIndex].members
      // .filter((user) => user.googleID !== this.props.currentUser.googleID);
      // Sorting
      members = this.sortByNextDate(members);

      // UI
      members = members.map((member, index) => {
        return (
          <Item key={index}>
            <Item.Content>
              <Item.Header>{member.name}</Item.Header>
              <Item.Meta >
                <span className="price">
                  {new Date(member.dateOfBirth).toLocaleDateString("en-GB", {weekday: "long", day:"numeric", month: "long"})} 
                </span>
              { this.upcomingDate(member.dateOfBirth)  &&  
                <Icon color="teal" loading name='certificate' />
              }
              </Item.Meta>

              <Item.Description>
                {member.wishList.length ? `Wishlist : ${member.wishList.join(", ")}` : `No wishes 😑`}
              </Item.Description>

            </Item.Content>
          </Item>
        );
      });

      segments.push(
        <Segment>
          <Item.Group divided>{members}</Item.Group>
        </Segment>
      );
    }

    return segments;
  }

  render() {
    const groups = this.props.list?.map((group, index) => {
      return { key: group.pseudo, text: group.pseudo, value: index };
    });

    return (
      <div>
        <SegmentGroup>
          <Segment inverted color='teal' tertiary>
            <Grid>
              <Grid.Column verticalAlign='middle' width='2' >
                <Header inverted content='GROUPS' ></Header>
              </Grid.Column>
              <Grid.Column width='14'>
                  <Button
                    inverted
                    floated='right'
                    circular
                    onClick= {(ev, data) => this.props.openJoinModal(true)}
                    content='JOIN'
                  />

              <Button
                inverted
                floated='right'
                circular
                onClick= {(ev, data) => this.props.openCreateModal(true)}
                content='CREATE'
              />

              </Grid.Column>
            </Grid>
          </Segment>
          {this.props?.list?.length > 0 && 
            this.props.list && this.groupSelectionElement(groups)
            
          }
        </SegmentGroup>
      </div>
    );
  }
}

export default Groups;
