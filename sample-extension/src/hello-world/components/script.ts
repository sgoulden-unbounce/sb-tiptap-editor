export const getInlineScript = () => {
  return `console.log("Hello World App is running inline js script in View Mode")
  `;
};

export const runOnloadMethod = () => {
  return `alert(moment().format('MMMM Do YYYY, h:mm:ss a'))`;
};
