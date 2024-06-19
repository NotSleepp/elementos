import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table"
import data from '../MOCK_DATA.json'
import dayjs from "dayjs"


export default function SimpleTable() {

   const columns = [
    {
        header: "ID",
        accessorKey: 'id',
        footer: 'mi id'
    },
    {
        header: "NOMBRE",
        accessorKey: 'first_name',
        footer: 'mi nombre'
    },
    {
        header: "APELLIDO",
        accessorKey: 'last_name',
        footer: 'mi apellido'
    },
    {
        header: "EMAIL",
        accessorKey: 'email',
        footer: 'mi email'
    },
    {
        header: "GENERO",
        accessorKey: 'gender',
        footer: 'mi genero'
    },
    {
        header: "CUM",
        accessorKey: 'bierthday',
        footer: 'mi cum',
        cell:  info =>  {

           return dayjs(info.getValue()).format('DD/MM/YY')
        }
        
        
    }
   ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })
  return (
    <div>
      <table>
        <thead>
            {
                table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {
                            headerGroup.headers.map(header=>(
                                <th key={header.id}>
                                    {
                                        flexRender(header.column.columnDef.header, header.getContext())
                                    }
                                </th>
                            ))
                        }
                    </tr>
                ))
            }
        </thead>
        <tbody>
            {
                table.getRowModel().rows.map(row =>(
                    <tr key={row.id}>
                        {
                            row.getVisibleCells().map(cell=>(
                                <td key={cell.id}>
                                    {
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
        <tfoot>
            {
                table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {
                            footerGroup.headers.map(footer => (
                                <th key={footer.id}>
                                    {
                                        flexRender(footer.column.columnDef.footer, footer.getContext())
                                    }
                                </th>
                            ))
                        }
                    </tr>
                ))
            }
        </tfoot>
      </table>
      <button onClick={()=>table.setPageIndex(0)}>
            Primer pagina
        </button>
        <button  onClick={()=>table.previousPage()} >
            Pagina anterior
        </button>
        <button onClick={()=>table.nextPage()}>
            Pagina Siguiente
        </button>
        <button  onClick={()=>table.setPageIndex(table.getPageCount()-1)}>
            Ultima Pagina
        </button>
    </div>
  )
}
