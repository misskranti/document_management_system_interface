"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useDocumentStore } from "@/lib/document-store"
import { Search, Calendar, Tag, X, Filter } from "lucide-react"

export function FileSearch() {
  const [majorHead, setMajorHead] = useState("All Categories")
  const [minorHead, setMinorHead] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const { searchDocuments, availableTags, setSearchResults } = useDocumentStore()

  const personalNames = ["John", "Tom", "Emily", "Sarah", "Michael", "Jessica", "David", "Lisa"]
  const departments = ["Accounts", "HR", "IT", "Finance", "Marketing", "Operations", "Legal", "Sales"]

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

  const handleSearch = () => {
    const searchCriteria = {
      majorHead: majorHead === "All Categories" ? undefined : majorHead,
      minorHead: minorHead || undefined,
      tags: tags.length > 0 ? tags : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }

    const results = searchDocuments(searchCriteria)
    setSearchResults(results)
  }

  const handleClearFilters = () => {
    setMajorHead("All Categories")
    setMinorHead("")
    setTags([])
    setCurrentTag("")
    setFromDate("")
    setToDate("")
    setSearchResults([])
  }

  const getMinorHeadOptions = () => {
    if (majorHead === "Personal") return personalNames
    if (majorHead === "Professional") return departments
    return []
  }

  const displayValue = minorHead || "all"

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Search Documents
        </CardTitle>
        <CardDescription>Find your documents using various filters and criteria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={majorHead} onValueChange={setMajorHead}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              {majorHead === "Personal" ? "Name" : majorHead === "Professional" ? "Department" : "Subcategory"}
            </Label>
            <Select
              value={displayValue}
              onValueChange={(value) => setMinorHead(value === "all" ? "" : value)}
              disabled={!majorHead || majorHead === "All Categories"}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${majorHead === "Personal" ? "name" : "department"}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {majorHead === "Personal" ? "Names" : "Departments"}</SelectItem>
                {getMinorHeadOptions().map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-date">From Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-date">To Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Add tags to search..."
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
              <p>Available tags:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {availableTags.map((tag) => (
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

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Search Documents
          </Button>
          <Button onClick={handleClearFilters} variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
