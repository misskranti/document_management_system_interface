"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import { FileSearch } from "@/components/file-search"
import { FileResults } from "@/components/file-results"
import { useAuthStore } from "@/lib/auth-store"
import { useDocumentStore } from "@/lib/document-store"
import { LogOut, Settings, Upload, Search, Files } from "lucide-react"

interface DashboardProps {
  onSwitchToAdmin: () => void
}

export function Dashboard({ onSwitchToAdmin }: DashboardProps) {
  const { logout, isAdmin } = useAuthStore()
  const { documents } = useDocumentStore()
  const [activeTab, setActiveTab] = useState("upload")

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Files className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Document Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Button variant="outline" onClick={onSwitchToAdmin}>
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your Document Hub</h2>
          <p className="text-gray-600">Upload, search, and manage your documents efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <Files className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personal Documents</CardTitle>
              <Files className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.filter((doc) => doc.majorHead === "Personal").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Professional Documents</CardTitle>
              <Files className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter((doc) => doc.majorHead === "Professional").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Search Documents
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center">
              <Files className="h-4 w-4 mr-2" />
              All Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <FileUpload />
          </TabsContent>

          <TabsContent value="search">
            <FileSearch />
          </TabsContent>

          <TabsContent value="results">
            <FileResults />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
