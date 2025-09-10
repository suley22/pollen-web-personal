import { useState } from "react";
import { UserInfoModel } from "@/app/login/registerSchema";
import {
  emailErrorMessages,
  passwordErrorMessages,
} from "@/app/login/registerSchema";

export function useRegister() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailChecks, setEmailChecks] = useState([]);
  const [passwordChecks, setPasswordChecks] = useState([]);

  const emailId = "email";
  const passwordFieldId = "password";

  function getErrorMessages(messages, errorList) {
    return Object.entries(messages).map(([, message]) => ({
      label: message,
      valid: !errorList.includes(message),
    }));
  }

  async function validateFormChecks(name, errorList = []) {
    let errorMessageList = errorList
      .filter((issue) => issue.path.toString() == name)
      .map((issue) => issue.message);

    switch (name) {
      case emailId: {
        const checks = getErrorMessages(emailErrorMessages, errorMessageList);

        setEmailChecks(checks);
        setIsFormValid(checks.every((check) => check.valid) && passwordChecks.every((check) => check.valid) && passwordChecks.length > 0);

        break;
      }
      case passwordFieldId: {
        const checks = getErrorMessages(
          passwordErrorMessages,
          errorMessageList,
        );

        await setPasswordChecks(checks);
        await setIsFormValid(emailChecks.every((check) => check.valid) && checks.every((check) => check.valid) && emailChecks.length > 0);
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
