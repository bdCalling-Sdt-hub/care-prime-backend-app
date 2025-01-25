const generateOTP = () => {
  return Math.floor(Math.random() * (999 - 1000 + 1) + 1000);
};

export default generateOTP;