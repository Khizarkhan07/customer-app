import React from 'react';
type dataType = {
    [key: string]: string| number;
}
type props = {
    cols : Array<string|number>,
    data: dataType[]
}
const Table:React.FC<props> = ({cols, data})  => {
    const td : any = []
    const rows: any = []
    data.map ((row: dataType )=> {
        td.push (<tr> </tr>)
        for (const [key, value] of Object.entries(row)) {
            rows.push (
                <tr>
                    <td>
                        {value}
                    </td>
                </tr>

            )
        }
    })
    console.log(data)
    return (
        <div className="table-wrapper-scroll-y my-custom-scrollbar">

            <table className="table table-bordered table-striped mb-0">

                <thead className="thead-light">
                    <tr>
                        {cols.map((colName: string | number) => {
                                return <th>
                                {colName}
                                </th>
                            }
                        )}
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
}

export default Table;