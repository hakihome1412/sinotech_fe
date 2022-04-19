const NumberWithCommas = (num: number): string => {
  if (!num) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Functions = {
  NumberWithCommas,
};

export default Functions;
