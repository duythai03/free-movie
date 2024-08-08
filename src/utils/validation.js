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
  if (!name || !email || !password || !confirmPassword) {
    return "Vui lòng nhập đầy đủ thông tin";
  }
  if (!reg.test(email)) {
    return "Email không hợp lệ";
  }
  if (password.length < 6) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  }
  if (password !== confirmPassword) {
    return "Mật khẩu không khớp";
  }
  return null;
};

export { validateLogin, validateSignUp };
