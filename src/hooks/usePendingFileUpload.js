"use client";

import { useState } from "react";
import { useFileUpload } from "./useFileUpload";

/**
 * Hook to manage pending file uploads that will be processed on form submission
 */
export function usePendingFileUpload() {
  const [pendingFiles, setPendingFiles] = useState(new Map());
  const { uploadFile, isUploading } = useFileUpload();

  /**
   * Add a file to pending uploads
   * @param {string} fieldName - The form field name
   * @param {File} file - The file object
   * @param {string} displayName - The name to show in the input
   */
  const addPendingFile = (fieldName, file, displayName) => {
    setPendingFiles(prev => new Map(prev.set(fieldName, { file, displayName })));
  };

  /**
   * Remove a pending file
   * @param {string} fieldName - The form field name
   */
  const removePendingFile = (fieldName) => {
    setPendingFiles(prev => {
      const newMap = new Map(prev);
      newMap.delete(fieldName);
      return newMap;
    });
  };

  /**
   * Get a pending file by field name
   * @param {string} fieldName - The form field name
   * @returns {Object|null} - The pending file object or null
   */
  const getPendingFile = (fieldName) => {
    return pendingFiles.get(fieldName) || null;
  };

  /**
   * Upload all pending files and return their URLs
   * @param {string} bucketName - Supabase bucket name
   * @param {string} folder - Folder within the bucket
   * @returns {Promise<Object>} - Object with field names as keys and URLs as values
   */
  const uploadAllPendingFiles = async (bucketName = "images", folder = "employer_logo") => {
    const uploadResults = {};
    const uploadPromises = [];

    for (const [fieldName, { file }] of pendingFiles.entries()) {
      const uploadPromise = uploadFile(file, bucketName, folder).then(url => {
        if (url) {
          uploadResults[fieldName] = url;
        }
        return { fieldName, url };
      });
      uploadPromises.push(uploadPromise);
    }

    await Promise.all(uploadPromises);
    
    // Clear pending files after upload
    setPendingFiles(new Map());
    
    return uploadResults;
  };

  /**
   * Check if there are any pending files
   * @returns {boolean}
   */
  const hasPendingFiles = () => {
    return pendingFiles.size > 0;
  };

  /**
   * Get all pending file field names
   * @returns {string[]}
   */
  const getPendingFieldNames = () => {
    return Array.from(pendingFiles.keys());
  };

  /**
   * Clear all pending files
   */
  const clearPendingFiles = () => {
    setPendingFiles(new Map());
  };

  return {
    addPendingFile,
    removePendingFile,
    getPendingFile,
    uploadAllPendingFiles,
    hasPendingFiles,
    getPendingFieldNames,
    clearPendingFiles,
    isUploading,
    pendingFilesCount: pendingFiles.size,
  };
}