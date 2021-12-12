const getToken = (): string => {
  const token = localStorage.getItem("token") as string;
  console.log(token);
  return token;
};

export default getToken;
