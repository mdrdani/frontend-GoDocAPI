"use client";

import { useEffect, useState } from "react";
import { DocumentsTable } from "@/components/documents-table";
import { UploadDialog } from "@/components/upload-dialog";
import { getDocuments } from "@/lib/api";
import { Document } from "@/types";

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    // Don't set loading to true on refresh to avoid flickering if we want
    // but for now simplest is fine. Use separate loading state for initial load vs refresh if needed.
    try {
      const data = await getDocuments();
      setDocuments(data || []);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GoDocAPI Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your documents securely and efficiently.</p>
        </div>
        <UploadDialog onUploadSuccess={fetchDocuments} />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">Loading documents...</div>
      ) : (
        <DocumentsTable documents={documents} onDeleteSuccess={fetchDocuments} />
      )}
    </main>
  );
}
