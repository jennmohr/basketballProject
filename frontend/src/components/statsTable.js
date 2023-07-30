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
          <td>{(props.stats && props.stats["PASS"]) || "-"}</td>
          <td>{(props.stats && props.stats["SHOT"]) || "-"}</td>
          <td>{(props.stats && props.stats["REB"]) || "-"}</td>
          <td>{(props.stats && props.stats["FOUL"]) || "-"}</td>
          <td>{(props.stats && props.stats["TO"]) || "-"}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StatsTable;
