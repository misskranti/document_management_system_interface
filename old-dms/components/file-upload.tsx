"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useDocumentStore } from "@/lib/document-store"
import { Upload, X, Calendar, Tag, FileText } from "lucide-react"

export function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [date, setDate] = useState("")
  const [majorHead, setMajorHead] = useState("")
  const [minorHead, setMinorHead] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [remarks, setRemarks] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const { toast } = useToast()
  const { addDocument, availableTags } = useDocumentStore()

  const personalNames = ["John", "Tom", "Emily", "Sarah", "Michael", "Jessica", "David", "Lisa"]
  const departments = ["Accounts", "HR", "IT", "Finance", "Marketing", "Operations", "Legal", "Sales"]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Only PDF and image files (JPEG, PNG) are allowed",
          variant: "destructive",
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile || !date || !majorHead || !minorHead) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newDocument = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        date,
        majorHead,
        minorHead,
        tags,
        remarks,
        uploadedAt: new Date().toISOString(),
        fileUrl: URL.createObjectURL(selectedFile), // For preview purposes
      }

      addDocument(newDocument)

      // Reset form
      setSelectedFile(null)
      setDate("")
      setMajorHead("")
      setMinorHead("")
      setTags([])
      setRemarks("")

      // Reset file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      toast({
        title: "Upload Successful",
        description: "Your document has been uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getMinorHeadOptions = () => {
    if (majorHead === "Personal") return personalNames
    if (majorHead === "Professional") return departments
    return []
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </CardTitle>
        <CardDescription>Upload your documents with proper categorization and tags</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select File *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPEG, PNG files only</p>
              </label>
              {selectedFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={majorHead} onValueChange={setMajorHead}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                {majorHead === "Personal" ? "Name" : majorHead === "Professional" ? "Department" : "Subcategory"} *
              </Label>
              <Select value={minorHead} onValueChange={setMinorHead} disabled={!majorHead}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${majorHead === "Personal" ? "name" : "department"}`} />
                </SelectTrigger>
                <SelectContent>
                  {getMinorHeadOptions().map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Add tags..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
            {availableTags.length > 0 && (
              <div className="text-sm text-gray-500">
                <p>Suggested tags:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {availableTags.slice(0, 5).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer text-xs"
                      onClick={() => {
                        if (!tags.includes(tag)) {
                          setTags([...tags, tag])
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="remarks"
                placeholder="Add any additional remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="pl-10 min-h-[100px]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
