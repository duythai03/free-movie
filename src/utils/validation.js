const validateLogin = (email, password) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!email || !password) {
    return "Vui lòng nhập đầy đủ thông tin";
  }
  if (!reg.test(email)) {
    return "Email không hợp lệ";
  }
  if (password.length < 6) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  }
  return null;
};

const validateSignUp = (name, email, password, confirmPassword) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const hasLetter = /[a-zA-Z]/.test(password); // Kiểm tra có chữ cái
  const hasNumber = /\d/.test(password); // Kiểm tra có số

  if (!name || !email || !password || !confirmPassword) {
    return "Vui lòng nhập đầy đủ thông tin";
  }
  if (!reg.test(email)) {
    return "Email không hợp lệ";
  }
  if (password.length < 6) {
    return "Mật khẩu phải có ít nhất 6 ký tự";
  }
  if (!hasLetter || !hasNumber) {
    return "Mật khẩu phải chứa ít nhất một chữ cái và một số";
  }
  if (password !== confirmPassword) {
    return "Mật khẩu không khớp";
  }
  return null;
};

export { validateLogin, validateSignUp };
