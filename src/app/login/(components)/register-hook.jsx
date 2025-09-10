import { useState, useEffect } from "react";
import { UserInfoModel } from "@/app/login/registerSchema";
import {
  emailErrorMessages,
  passwordErrorMessages,
} from "@/app/login/registerSchema";

export function useRegister() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailChecks, setEmailChecks] = useState([]);
  const [passwordChecks, setPasswordChecks] = useState([]);
  
  useEffect(() => {
  const emailIsValid = emailChecks.every((c) => c.valid);
  const passwordIsValid = passwordChecks.every((c) => c.valid);
  setIsFormValid(emailIsValid && passwordIsValid && emailChecks.length > 0 && passwordChecks.length > 0);
}, [emailChecks, passwordChecks]);

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

  function handleOnChange(name, value) {
    try {
      UserInfoModel.parse({ [name]: value });
      validateFormChecks(name);
    } catch (error) {
      if (error) {
        console.log("error", error);

        validateFormChecks(name, error.issues ?? []);
      }
    }
  }

  return {
    form: {
      valid: isFormValid,
      checks: {
        email: emailChecks,
        password: passwordChecks,
      },
      fields: {
        emailId,
        passwordFieldId,
      },
      handleOnChange: handleOnChange,
    },
  };
}
