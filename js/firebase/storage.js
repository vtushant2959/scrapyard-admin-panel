import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import { storage } from "./firebase-config.js";

class StorageService {
  /* =========================
     VALIDATE FILE
  ========================= */
  validateFile(file) {
    if (!file) {
      throw new Error(
        "No file selected"
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      throw new Error(
        "Invalid file type"
      );
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error(
        "File size exceeds 5MB"
      );
    }

    return true;
  }

  /* =========================
     GENERATE FILE NAME
  ========================= */
  generateFileName(file) {
    const timestamp =
      Date.now();

    const cleanName =
      file.name.replace(
        /\s+/g,
        "-"
      );

    return `${timestamp}-${cleanName}`;
  }

  /* =========================
     UPLOAD FILE
  ========================= */
  async upload(
    file,
    folder = "uploads",
    onProgress = null
  ) {
    try {
      this.validateFile(file);

      const fileName =
        this.generateFileName(
          file
        );

      const fullPath =
        `${folder}/${fileName}`;

      const storageRef = ref(
        storage,
        fullPath
      );

      const metadata = {
        contentType:
          file.type
      };

      const uploadTask =
        uploadBytesResumable(
          storageRef,
          file,
          metadata
        );

      return new Promise(
        (resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (
                  snapshot.bytesTransferred /
                  snapshot.totalBytes
                ) *
                100;

              if (
                onProgress
              ) {
                onProgress(
                  Math.round(
                    progress
                  )
                );
              }
            },

            (error) => {
              console.error(
                "Upload failed:",
                error
              );

              reject(error);
            },

            async () => {
              const downloadURL =
                await getDownloadURL(
                  uploadTask.snapshot.ref
                );

              resolve({
                url: downloadURL,
                path: fullPath,
                fileName
              });
            }
          );
        }
      );
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      throw error;
    }
  }

  /* =========================
     DELETE FILE
  ========================= */
  async delete(path) {
    try {
      if (!path) {
        throw new Error(
          "File path required"
        );
      }

      const storageRef = ref(
        storage,
        path
      );

      await deleteObject(
        storageRef
      );

      return true;
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      throw error;
    }
  }

  /* =========================
     GET FILE URL
  ========================= */
  async getFileURL(path) {
    try {
      const storageRef = ref(
        storage,
        path
      );

      const url =
        await getDownloadURL(
          storageRef
        );

      return url;
    } catch (error) {
      console.error(
        "URL fetch error:",
        error
      );

      throw error;
    }
  }
}

const storageService =
  new StorageService();

export default storageService;