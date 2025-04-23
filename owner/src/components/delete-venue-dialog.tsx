"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface DeleteVenueDialogProps {
  venueName: string
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<void>
}

export function DeleteVenueDialog({ venueName, isOpen, onClose, onDelete }: DeleteVenueDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
      toast({
        title: "Success",
        description: "Venue deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting venue:", error)
      toast({
        title: "Error",
        description: "Failed to delete venue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      onClose()
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this venue?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete <span className="font-semibold">{venueName}</span>. This action cannot be undone and
            all data associated with this venue will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Venue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
