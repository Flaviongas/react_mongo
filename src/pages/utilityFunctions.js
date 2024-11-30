export function buildHtmlTable(data) {
  const headers = ['Titulo', 'Autor', 'Año', 'Editorial', 'Precio'];

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border">{row.Titulo}</td>
            <td className="px-4 py-2 border">{row.Autor}</td>
            <td className="px-4 py-2 border">{row.Año}</td>
            <td className="px-4 py-2 border">{row.Editorial}</td>
            <td className="px-4 py-2 border">{row.Precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

