import React from 'react';

type props = {
    [key: string] :number|string
}
const TableRow: React.FC<props> = ({data}) => {

    const rows: any = []

        for (const [key, value] of Object.entries(data)) {
            rows.push (
                <td>
                    {value}
                </td>
            )
        }


    return (
        <tr>
            {
                rows.map((td: any) => {
                    return (
                        <td> {td}</td>
                    )
                })
            }
        </tr>
    );
}

export default TableRow;