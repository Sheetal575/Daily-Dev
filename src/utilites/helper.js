export const handleCopy = (url) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      console.log("URL copied to clipboard", url);
    })
    .catch((error) => {
      console.error("Failed to copy URL", error);
    });
};

export const capitalizeName = (name) => {
  let words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
};
