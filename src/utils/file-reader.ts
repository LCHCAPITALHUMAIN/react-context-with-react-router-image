export const readFileAsync = (file: Blob) => {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  };