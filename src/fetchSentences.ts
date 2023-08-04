import data from "./data";

const fetchSentences = async () => {
  try {
    const response = await fetch("http://metaphorpsum.com/sentences/2");
    if (response.status >= 400) {
      const data = await response.text();
      return data;
    } else {
      const randomIndex = Math.floor(Math.random() * data.length + 1);
      return data[randomIndex];
    }
  } catch (e) {
    const randomIndex = Math.floor(Math.random() * data.length + 1);
    return data[randomIndex];
  }
};

export default fetchSentences;
