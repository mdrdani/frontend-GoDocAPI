"use client";

import { Document } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { File as FileIcon, Trash2, Download } from "lucide-react";
import { deleteDocument, api } from "@/lib/api";

interface DocumentsTableProps {
    documents: Document[];
    onDeleteSuccess: () => void;
}

export function DocumentsTable({ documents, onDeleteSuccess }: DocumentsTableProps) {

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this document?")) {
            try {
                await deleteDocument(id);
                onDeleteSuccess();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const handleDownload = (id: string, filename: string) => {
        // Trigger download by opening the URL in new tab or using direct link
        // Since we have a rewrite, we can just point to /api/v1/documents/:id/download
        // But we might want to force download.
        const url = `/api/v1/documents/${id}/download`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // This might not work with cross-origin or if headers are not set, but let's try
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Filename</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No documents found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        documents.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>
                                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                                </TableCell>
                                <TableCell className="font-medium">{doc.filename}</TableCell>
                                <TableCell>{(doc.size / 1024).toFixed(2)} KB</TableCell>
                                <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.id, doc.filename)}>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(doc.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
