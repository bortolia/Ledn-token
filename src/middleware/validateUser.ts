import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, country, email, dob, mfa, referredBy } = req.body;
  const validationArray: any[] = [];
  if (!firstName || !isString(firstName)) {
    validationArray.push("ValidationError: firstName not of type string");
  }
  if (!lastName || !isString(lastName)) {
    validationArray.push("ValidationError: lastName not of type string");
  }
  if (!country || !isString(country) || country.length !== 2) {
    validationArray.push("ValidationError: country not of type string or 2-char country code");
  }
  if (!email || !isString(email)) {
    validationArray.push("ValidationError: email not of type string");
  }
  if (!dob || !isDate(dob)) {
    validationArray.push("ValidationError: dob not a valid date");
  }
  if (!isValidMfa(mfa)) {
    validationArray.push(
      "ValidationError: mfa not of valid options null or string types [null, 'SMS', 'TOTP']"
    );
  }
  if (!(await isValidReferree(referredBy))) {
    validationArray.push(`ValidationError: the referee ${referredBy} does not exist`);
  }

  if (validationArray.length > 0) {
    return res.status(400).json({ msg: validationArray });
  }

  next();
};

const isString = (property: string) => {
  if (typeof property !== "string") {
    return false;
  }
  return true;
};

const isDate = (dob: string) => {
  return new Date(dob).toDateString() !== "Invalid Date" && !isNaN(new Date(dob).valueOf());
};

const isValidMfa = (mfa: string | null) => {
  return mfa === null || mfa === "SMS" || mfa === "TOTP";
};

const isValidReferree = async (refer: string | null) => {
  if (typeof refer === "string") {
    const userExists: boolean = await UserModel.exists({ email: refer });
    return userExists;
  }
  return refer === null;
};

export default validateUser;
