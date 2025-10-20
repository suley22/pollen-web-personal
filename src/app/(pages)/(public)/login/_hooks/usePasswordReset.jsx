import { useState, useEffect } from "react";
import {
  passwordErrorMessages,
  emailErrorMessages,
  UserInfoModel,
} from "../_schema/registerSchema";

export function usePasswordReset() {
  const [passwordChecks, setPasswordChecks] = useState([]);
  const [emailChecks, setEmailChecks] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const passwordIsValid = passwordChecks.every((c) => c.valid);
    const passwordsMatch = password === confirmPassword && password.length > 0;
    const emailIsValid = emailChecks.every((c) => c.valid);
    
    setIsPasswordValid(passwordIsValid && passwordsMatch && passwordChecks.length > 0);
    setIsEmailValid(emailIsValid && emailChecks.length > 0);
  }, [passwordChecks, password, confirmPassword, emailChecks]);

  const emailId = "email";
  const passwordFieldId = "password";

  function getErrorMessages(messages, errorList) {
    return Object.entries(messages).map(([, message]) => ({
      label: message,
      valid: !errorList.includes(message),
    }));
  }



  function validateFormChecks(name, errorList = []) {
    let errorMessageList = errorList
      .filter((issue) => issue.path.toString() == name)
      .map((issue) => issue.message);

    switch (name) {
      case emailId: {
        const checks = getErrorMessages(emailErrorMessages, errorMessageList);
        setEmailChecks(checks);
        break;
      }
      case passwordFieldId: {
        const checks = getErrorMessages(
          passwordErrorMessages,
          errorMessageList,
        );
        setPasswordChecks(checks);
        break;
      }
    }
  }

  function handleEmailChange(value) {
    setEmail(value);
    try {
      UserInfoModel.parse({ [emailId]: value });
      validateFormChecks(emailId);
    } catch (error) {
      if (error) {
        validateFormChecks(emailId, error.issues ?? []);
      }
    }
  }

  function handlePasswordChange(value) {
    setPassword(value);
    try {
      UserInfoModel.parse({ [passwordFieldId]: value });
      validateFormChecks(passwordFieldId);
    } catch (error) {
      if (error) {
        validateFormChecks(passwordFieldId, error.issues ?? []);
      }
    }
  }

  function handleConfirmPasswordChange(value) {
    setConfirmPassword(value);
  }

  return {
    email,
    emailChecks,
    isEmailValid,
    password,
    confirmPassword,
    passwordChecks,
    isPasswordValid,
    passwordsMatch: password === confirmPassword,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
}