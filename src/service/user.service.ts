import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "./../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser() {}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: "password";
}) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return false;
    }
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}
