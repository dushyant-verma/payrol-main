import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);

export const UploadFile = async (file, userphone) => {
  const storage = getStorage(app);

  try {
    const mountainImagesRef = ref(
      storage,
      "company_profile_images_" + userphone + "/" + file?.name
    );

    const uploadImage = await uploadBytes(mountainImagesRef, file).then(
      async (snapshot) => {
        const url = await getDownloadURL(
          ref(storage, "company_profile_images_" + userphone + "/" + file?.name)
        ).then((url) => {
          return url;
        });
        return url;
      }
    );
    return uploadImage;
  } catch (err) {
    console.log({ err });
  }
};

export const UploadFileApi = async (docName, file, userphone) => {
  const storage = getStorage(app);

  try {
    const mountainImagesRef = ref(
      storage,
      docName + userphone + "/" + file?.name
    );

    const uploadImage = await uploadBytes(mountainImagesRef, file).then(
      async (snapshot) => {
        const url = await getDownloadURL(
          ref(storage, docName + userphone + "/" + file?.name)
        ).then((url) => {
          return url;
        });
        return url;
      }
    );
    return uploadImage;
  } catch (err) {
    console.log({ err });
  }
};
