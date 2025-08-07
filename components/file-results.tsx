"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDocumentStore } from "@/lib/document-store"
import { useToast } from "@/hooks/use-toast"
import { Download, Eye, FileText, ImageIcon, Calendar, User, Building, Archive } from "lucide-react"

export function FileResults() {
  const { documents, searchResults } = useDocumentStore()
  const { toast } = useToast()
  const [previewDocument, setPreviewDocument] = useState<any>(null)

  const displayDocuments = searchResults.length > 0 ? searchResults : documents

  const handleDownload = (document: any) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = document.fileUrl
    link.download = document.fileName
    link.click()

    toast({
      title: "Download Started",
      description: `Downloading ${document.fileName}`,
    })
  }

  const handleDownloadAll = () => {
    // Simulate downloading all files as ZIP
    toast({
      title: "Download All Started",
      description: `Preparing ZIP file with ${displayDocuments.length} documents`,
    })
  }

  const handlePreview = (document: any) => {
    setPreviewDocument(document)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    }
    return <FileText className="h-5 w-5 text-red-500" />
  }

  if (displayDocuments.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">
            {searchResults.length === 0 && documents.length === 0
              ? "Upload your first document to get started"
              : "Try adjusting your search criteria"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Download All */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{searchResults.length > 0 ? "Search Results" : "All Documents"}</h3>
          <p className="text-sm text-gray-500">
            {displayDocuments.length} document{displayDocuments.length !== 1 ? "s" : ""} found
          </p>
        </div>
        {displayDocuments.length > 0 && (
          <Button onClick={handleDownloadAll} variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Download All as ZIP
          </Button>
        )}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getFileIcon(document.fileType)}
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-medium truncate">{document.fileName}</CardTitle>
                    <CardDescription className="text-xs">{formatFileSize(document.fileSize)}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Document Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-3 w-3 mr-2" />
                  {new Date(document.date).toLocaleDateString()}
                </div>

                <div className="flex items-center text-gray-600">
                  {document.majorHead === "Personal" ? (
                    <User className="h-3 w-3 mr-2" />
                  ) : (
                    <Building className="h-3 w-3 mr-2" />
                  )}
                  {document.majorHead} - {document.minorHead}
                </div>
              </div>

              {/* Tags */}
              {document.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {document.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {document.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{document.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Remarks */}
              {document.remarks && <p className="text-xs text-gray-500 line-clamp-2">{document.remarks}</p>}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handlePreview(document)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        {getFileIcon(document.fileType)}
                        <span className="ml-2">{document.fileName}</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {document.fileType.startsWith("image/") ? (
                        <img
                          src={document.fileUrl || "/placeholder.svg"}
                          alt={document.fileName}
                          className="max-w-full h-auto rounded-lg"
                        />
                      ) : document.fileType === "application/pdf" ? (
                        <div className="text-center py-12">
                          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">PDF Preview</p>
                          <p className="text-sm text-gray-500 mt-2">
                            PDF preview would be displayed here in a real application
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">Preview not available</p>
                          <p className="text-sm text-gray-500 mt-2">This file type cannot be previewed</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button size="sm" className="flex-1" onClick={() => handleDownload(document)}>
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
