"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { uploadFile } from "@/lib/api";

interface UploadDialogProps {
    onUploadSuccess: () => void;
}

export function UploadDialog({ onUploadSuccess }: UploadDialogProps) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        try {
            await uploadFile(file);
            setOpen(false);
            setFile(null);
            onUploadSuccess();
        } catch (error) {
            console.error("Upload failed", error);
            // Ideally show a toast here
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                        Select a file to upload to the document storage.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            File
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            className="col-span-3"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpload} disabled={!file || uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
