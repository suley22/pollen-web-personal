import { useState, useEffect } from "react";
import { passwordErrorMessages, emailErrorMessages } from "../_schema/registerSchema";

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



  function validateEmail(value) {
    setEmail(value);
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checks = [{
      label: emailErrorMessages.EMAIL_NOT_VALID,
      valid: emailRegex.test(value) && value.length > 0,
    }];

    setEmailChecks(checks);
  }

  function validatePassword(value) {
    setPassword(value);
    
    // Validate against schema
    const checks = [];
    
    // Check minimum length
    checks.push({
      label: passwordErrorMessages.MIN_PASSWORD_LENGTH,
      valid: value.length >= 8,
    });
    
    // Check uppercase letter
    checks.push({
      label: passwordErrorMessages.MIN_UPPERCASE_LETTER,
      valid: /[A-Z]/.test(value),
    });
    
    // Check number
    checks.push({
      label: passwordErrorMessages.MIN_PASSWORD_NUMBER,
      valid: /[0-9]/.test(value),
    });
    
    // Check symbol
    checks.push({
      label: passwordErrorMessages.MIN_PASSWORD_SYMBOL,
      valid: /[^a-zA-Z0-9]/.test(value),
    });

    setPasswordChecks(checks);
  }

  function handleEmailChange(value) {
    validateEmail(value);
  }

  function handlePasswordChange(value) {
    validatePassword(value);
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