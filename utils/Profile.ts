import { auth } from "@/firebase";
import {
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import Router from "next/router";

interface Props {
  user: { email: string };
  editUser: {};
  photoUrl: string;
  setSnackBar: any;
  setEdit: any;
}

export const UpdateProfile = async (
  user: any,
  editUser: { name: string; email: string },
  photoUrl: string,
  { setSnackBar, setEdit }: any
) => {
  console.log("Jam ketu 2");
  try {
    if (user?.displayName !== editUser.name || user?.photoURL !== photoUrl) {
      await updateProfile(user, {
        displayName: editUser.name,
        photoURL: photoUrl,
      });
      setSnackBar({
        show: true,
        type: "success",
        text: "Profile updated successfully",
      });
    }
    if (user?.email !== editUser.email) {
      await updateEmail(user, editUser.email);
      setSnackBar({
        show: true,
        type: "success",
        text: "Profile updated successfully",
      });
    }
    setEdit(false);
  } catch (error: any) {
    setSnackBar({
      show: true,
      type: "error",
      text: "Failed to update profile",
    });
  }
};

export const VerifyEmail = async (
  user: any,
  { setOpenVerifyModal, setModalText }: any
) => {
  try {
    await sendEmailVerification(user);
    setOpenVerifyModal(true);
    setModalText("Email verification send. Check your email");
  } catch (error: any) {
    setOpenVerifyModal(true);
    setModalText(`${error.code}`);
  }
};

export const ResetPassword = async (
  user: any,
  { setOpenVerifyModal, setModalText }: any
) => {
  try {
    await sendPasswordResetEmail(auth, user?.email);
    setOpenVerifyModal(true);
    setModalText(`Verification password reset send to email:${user?.email}`);
  } catch (error: any) {
    setOpenVerifyModal(true);
    setModalText(
      "Verification password reset cannot be send. Please try again"
    );
  }
};

export const DeleteAccount = async (
  user: any,
  { setOpenVerifyModal, setModalText }: any
) => {
  try {
    await deleteUser(user);
    setOpenVerifyModal(true);
    setModalText("Account has been deleted. We hope we will see you back");
    setTimeout(() => {
      Router.push("/login");
    }, 3000);
  } catch (error) {
    setOpenVerifyModal(true);
    setModalText(
      "There was a problem while deleting the account. Please try again"
    );
  }
};
