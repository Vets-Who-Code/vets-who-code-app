/* eslint-disable class-methods-use-this */
import { AttachmentAdapter, PendingAttachment, CompleteAttachment } from "@assistant-ui/react";

export class PDFAttachmentAdapter implements AttachmentAdapter {
    accept = "application/pdf";

    async add({ file }: { file: File }): Promise<PendingAttachment> {
        // Validate file size
        const maxSize = 10 * 1024 * 1024; // 10MB limit
        if (file.size > maxSize) {
            throw new Error("PDF size exceeds 10MB limit");
        }

        return {
            id: crypto.randomUUID(),
            type: "file",
            name: file.name,
            contentType: "application/pdf",
            file,
            status: {
                type: "running",
                reason: "uploading",
                progress: 100,
            },
        };
    }

    async send(attachment: PendingAttachment): Promise<CompleteAttachment> {
        const data = await attachment.file.arrayBuffer();
        const b64 = Buffer.from(data).toString("base64");
        const dataUrl = `data:application/pdf;base64,${b64}`;

        return {
            id: attachment.id,
            type: "document",
            name: attachment.name,
            contentType: attachment.contentType,
            content: [
                {
                    type: "file",
                    mimeType: "application/pdf",
                    data: dataUrl,
                },
            ],
            status: { type: "complete" },
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async remove(_attachment: PendingAttachment): Promise<void> {
        // Cleanup if needed
    }
}
