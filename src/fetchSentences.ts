const fetchSentences = async (
  setData: React.Dispatch<React.SetStateAction<string>>,
) => {
  const response = await fetch("http://metaphorpsum.com/sentences/2");
  if (response.ok) {
    const data = await response.text();
    setData(data);
  }
};

export default fetchSentences;
