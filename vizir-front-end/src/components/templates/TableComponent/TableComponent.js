/* eslint-disable react/no-array-index-key */
import 'components/templates/TableComponent/TableComponent.scss';

const TableComponent = ({ tableContent = [] }) => {
  const tableLength = tableContent.length;
  return (
    <div className="table-component-container d-flex flex-column border rounded-3">
      {tableContent.map((row, index) => {
        if (index === 0) {
          return (
            <div
              key={row}
              className="table-header table-row-container border-row text-primary fw-bold"
            >
              {row.map((item, index2) => (
                <p key={index2}>{item}</p>
              ))}
            </div>
          );
        }
        if (index === tableLength - 1) {
          return (
            <div key={row} className="table-body table-row-container ">
              {row.map((item, index2) => (
                <p key={index2}>{item}</p>
              ))}
            </div>
          );
        }
        return (
          <div key={row} className="table-body table-row-container border-row">
            {row.map((item, index2) => (
              <p key={index2}>{item}</p>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TableComponent;
