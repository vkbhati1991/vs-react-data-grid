import React, { Component } from "react";
import "./GridCss.css";
import ReactGrid from "./Grid/ReactGrid";
import createRowData from "./createRowData";

class GridRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexes: [],
      rows: createRowData(40)
    };
  }

  onRowsSelected = (rows) => {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    });
  }
  onRowsDeSelected = (rows) => {
    const rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });

  }

  render() {
    const defaultColumnProperties = {
      draggable: true,
      IsSortable: true
    };

    const NameFormater = ({ value }) => {
      return <div>{value}</div>;
    };

    const columns = [
      {
        key: "id",
        name: "ID",
        color: "#2196f3",
        formatter: "progress"
      },
      {
        key: "avatar",
        name: "profile",
        formatter: "image"
      },
      {
        key: "firstName",
        name: "First Name",

        formatter: NameFormater
      },
      {
        key: "lastName",
        name: "Last Name"
      },
      {
        key: "jobTitle",
        name: "Job Title"

      },
      {
        key: "jobArea",
        name: "Job Area",
        color: "#2196F3",
        formatter: "link"
      },
      {
        key: "jobType",
        name: "Job Type"
      },
      {
        key: "email",
        name: "Email",
        formatter: "email",
        color: "#ffffff",
        bgColor: "#2196F3"

      },
      {
        key: "street",
        name: "Street"
      },
      {
        key: "zipCode",
        name: "ZipCode"
      },
      {
        key: "date",
        name: "Date"
      },
      {
        key: "catchPhrase",
        name: "Catch Phrase"
      }
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    const rows = this.state.rows;

    // const RowRenderer = ({ ...rowInfo }) => {
    //   const { row } = rowInfo;
    //   return (
    //     <div className="customRow">
    //       <div className="img"><img src={row.avatar} alt="" /></div>
    //       <div className="content">
    //         <div>{row.catchPhrase}</div>
    //         <div>{row.companyName}</div>
    //         <div>{row.county}</div>
    //         <div>{row.date}</div>
    //       </div>
    //     </div>
    //   )
    // }

    return (
      <div>
        <ReactGrid
          columns={columns}
          rowGetter={i => rows[i]}
          rowCount={10}
         // rowRenderer={RowRenderer}
            rowSelection={{
            showCheckbox: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeSelected: this.onRowsDeSelected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }

          }} />
      </div>
    );
  }
}

export default GridRender;
