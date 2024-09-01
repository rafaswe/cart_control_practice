export const getLogInRequest = (payload, onSuccess) => {
  return {
    endpoint: "interview/login",
    method: "POST",
    body: payload,
    isLogin: true,
    redirectTo: "/material_purchase",
    onSuccess: onSuccess,
  };
};
