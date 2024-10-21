import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  UploadIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { File as DBFile } from "@/lib/types"
import { useState } from "react"
import { formatBytes } from "@/lib/utils"
import FileCard from "./file-card";
import { FileUpload } from "@/components/elements/uploader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useAddFiles } from "@/hooks/use-file-query";
import { useParams } from "react-router-dom";

export const columns: ColumnDef<DBFile>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type" as keyof DBFile,
    header: "File type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "filename" as keyof DBFile,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Filename
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase max-w-96 overflow-clip">{row.getValue("filename")}</div>,
  },
  {
    accessorKey: "size" as keyof DBFile,
    header: () => <div className="text-right">Size</div>,
    cell: ({ row }) => {
      const size = parseFloat(row.getValue("size"))
      const formatted = formatBytes(size)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt" as keyof DBFile,
    header: () => <div className="text-right">Uploaded</div>,
    cell: ({ row }) => {
      const formatted = new Date(Date.parse(row.getValue("createdAt")))

      return <div className="text-right font-medium">{formatted.toDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.key)}
            >
              Copy file key
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.signedUrl)}
            >
              Copy file url
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const UploadFiles = () => {
    const { folderId } = useParams();
    const [files, setFiles] = useState<File[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const { mutateAsync: createFilesMutation } = useAddFiles();

    const onRemove = (index: number) => {
        if (!files) return
        const newFiles = files.filter((_, i) => i !== index)
        setFiles(newFiles);
    };
    
    const onSubmit = async () => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        
        let folderCreationPromise = () => createFilesMutation({ formData, folderId: folderId! });

        toast.promise(folderCreationPromise(), {
            loading: 'Adding files...',
            success: () => {
                setModalOpen(false);
                return "Successfully added files to folder";
            },
            error: (error) => {
                return error.message || 'Failed to create folder';
            },
        });
    };

    return (
        <Dialog
            open={modalOpen}
            onOpenChange={setModalOpen}
        >
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="flex items-center gap-2">
                    <UploadIcon />
                    <span>Upload files</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Drag and drop files or click to upload</DialogTitle>
                    <DialogDescription>
                        
                        <FileUpload
                            files={files}
                            setFiles={setFiles}
                        />
                        
                        {files?.length ? (
                            <ScrollArea className="h-60 w-full px-3">
                            <div className="flex max-h-48 flex-col gap-4">
                                {files?.map((file, index) => (
                                    <FileCard
                                        key={index}
                                        file={file}
                                        onRemove={() => onRemove(index)}
                                    />
                                ))}
                            </div>
                            </ScrollArea>
                        ) : null}
                    </DialogDescription>
                </DialogHeader>
            <DialogFooter>
                <Button
                    onClick={onSubmit}
                    disabled={(files.length == 0)}
                >
                    Upload
                </Button>

                <Button
                    variant={"secondary"}
                    onClick={() => setModalOpen(false)}
                >
                    Cancel
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const FilesTable = ({ files }: { files: DBFile[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: files,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter filenames..."
          value={(table.getColumn("filename")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("filename")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <UploadFiles />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilesTable;