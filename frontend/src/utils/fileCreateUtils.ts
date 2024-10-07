

export const fetchLocalFile = async(filePath: string): Promise<Blob> => {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    return blob;
}

export const blobToFile = (blob: Blob, fileName: string, lastModified: number): File =>{
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: lastModified,
    });
  }

export const createFileFromLocalImage = async(filePath: string, fileName: string, lastModified: number): Promise<File | string> => {
    try {
      const blob = await fetchLocalFile(filePath);
      const file = blobToFile(blob, fileName, lastModified);
      return file;
    } catch (error) {
      console.error("Error creating file from image:", error);
      return "null";
    }
  }