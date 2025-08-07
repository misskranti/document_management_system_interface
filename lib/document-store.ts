"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Document {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  date: string
  majorHead: string
  minorHead: string
  tags: string[]
  remarks: string
  uploadedAt: string
  fileUrl: string
}

interface SearchCriteria {
  majorHead?: string
  minorHead?: string
  tags?: string[]
  fromDate?: string
  toDate?: string
}

interface DocumentState {
  documents: Document[]
  searchResults: Document[]
  availableTags: string[]
  addDocument: (document: Document) => void
  searchDocuments: (criteria: SearchCriteria) => Document[]
  setSearchResults: (results: Document[]) => void
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      documents: [],
      searchResults: [],
      availableTags: ["important", "urgent", "confidential", "draft", "final", "review", "archived"],

      addDocument: (document: Document) => {
        const { documents, availableTags } = get()

        // Add new tags to available tags
        const newTags = document.tags.filter((tag) => !availableTags.includes(tag))
        const updatedAvailableTags = [...availableTags, ...newTags]

        set({
          documents: [...documents, document],
          availableTags: updatedAvailableTags,
        })
      },

      searchDocuments: (criteria: SearchCriteria) => {
        const { documents } = get()

        return documents.filter((doc) => {
          // Filter by major head
          if (criteria.majorHead && doc.majorHead !== criteria.majorHead) {
            return false
          }

          // Filter by minor head
          if (criteria.minorHead && doc.minorHead !== criteria.minorHead) {
            return false
          }

          // Filter by tags
          if (criteria.tags && criteria.tags.length > 0) {
            const hasMatchingTag = criteria.tags.some((tag) =>
              doc.tags.some((docTag) => docTag.toLowerCase().includes(tag.toLowerCase())),
            )
            if (!hasMatchingTag) {
              return false
            }
          }

          // Filter by date range
          if (criteria.fromDate) {
            if (new Date(doc.date) < new Date(criteria.fromDate)) {
              return false
            }
          }

          if (criteria.toDate) {
            if (new Date(doc.date) > new Date(criteria.toDate)) {
              return false
            }
          }

          return true
        })
      },

      setSearchResults: (results: Document[]) => {
        set({ searchResults: results })
      },
    }),
    {
      name: "document-storage",
    },
  ),
)
