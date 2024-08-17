export default function Table({ dataToDisplay }) {
  if (dataToDisplay.length === 0) return <div>Loading Table Data...</div>;
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(dataToDisplay[0])?.map((key) => {
            if (key != 'userId') return <th key={key}>{key.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.map((obj) => {
          return (
            <tr key={obj.id}>
              <td>{obj.id}</td>
              <td>{obj.title}</td>
              <td>{obj.completed.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
