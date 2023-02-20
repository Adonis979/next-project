import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

type UploadFileProps = {
  setPhotoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const uploadFile = (
  files: any,
  directory: string,
  { setProgress, setPhotoUrl }: UploadFileProps
): void => {
  const image = files[0];
  if (image) {
    const name = image?.name;
    const storageRef = ref(storage, `${directory}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhotoUrl(downloadURL);
          setProgress(0);
        });
      }
    );
  }
};
