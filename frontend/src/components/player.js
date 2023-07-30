import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

function Player(props) {
  return (
    <div className="player">
      {props.playerObj && (
        <Col xs lg="12">
          <Card>
            <Card.Img variant="top" src={props.playerObj.imageURL} />
            <Card.Body>
              <Card.Title>{props.playerObj.player}</Card.Title>
              <Card.Text>
                <h5>
                  <Badge pill bg="dark">
                    {props.jersey}
                  </Badge>
                  <Badge pill bg="primary" className="secondBadge">
                    {props.playerObj.position}
                  </Badge>
                </h5>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </div>
  );
}

export default Player;
