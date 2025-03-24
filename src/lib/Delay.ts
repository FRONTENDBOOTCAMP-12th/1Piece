const delay = (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec));

export default delay;
