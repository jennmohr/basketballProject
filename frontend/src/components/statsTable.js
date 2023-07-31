import Table from "react-bootstrap/Table";

function StatsTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Passes</th>
          <th>Shot Attempts</th>
          <th>Rebounds</th>
          <th>Fouls</th>
          <th>Turnovers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{(props.stats && props.stats["PASS"]) || "0"}</td>
          <td>{(props.stats && props.stats["SHOT"]) || "0"}</td>
          <td>{(props.stats && props.stats["REB"]) || "0"}</td>
          <td>{(props.stats && props.stats["FOUL"]) || "0"}</td>
          <td>{(props.stats && props.stats["TO"]) || "0"}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StatsTable;
