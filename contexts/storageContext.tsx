"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
export interface Storage {
  id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
}

interface StorageContextType {
  storageList: Storage[];
  loading: boolean;
  error: string | null;
  getStorages: () => Promise<void>;
  getStorageById: (id: string) => Promise<Storage | null>;
  uploadFile: (file: File) => Promise<void>;
  deleteStorage: (id: string) => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storageList, setStorageList] = useState<Storage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage/files`;

  // Fetch all storage
  const getStorages = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + "/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch storage files");
      }

      setStorageList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get single file by ID
  const getStorageById = async (id: string): Promise<Storage | null> => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to fetch file");
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Upload file using FormData
  const uploadFile = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(baseUrl + "/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || "Failed to upload file");
      }

      setStorageList((prev) => [data, ...prev]); // Add new file to top
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStorage = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.detail || "Failed to delete file");
      }

      setStorageList((prev) => prev.filter((file) => file.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        storageList,
        loading,
        error,
        getStorages,
        getStorageById,
        uploadFile,
        deleteStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorageContext must be used within a StorageProvider");
  }
  return context;
};
