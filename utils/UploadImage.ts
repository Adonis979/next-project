import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

type UploadFileProps = {
  setPhotoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const uploadFiles = (
  files: File[],
  postName: string
): Promise<string[]> => {
  const promises: Promise<any>[] = [];
  const postUrls: string[] = [];

  // Create a reference to the parent folder for this post
  const postRef = ref(storage, `images/${postName}`);

  // Loop through the files and upload each one
  for (const file of files) {
    const name = file.name;

    // Create a reference to the file inside the post folder
    const fileRef = ref(postRef, name);

    // Upload the file
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Add a promise to the list of promises for this upload
    promises.push(
      new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            reject(error);
          },
          () => {
            // Get the download URL for this file and add it to the array of URLs for this post
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                postUrls.push(url);
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      })
    );
  }

  // Wait for all the uploads to finish
  return Promise.all(promises).then(() => {
    return postUrls;
  });
};
