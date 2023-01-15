export const resizeImage = (base64Str: string, maxWidth = 320, maxHeight = 320) => {
    return new Promise((resolve) => {
      // console.log(base64Str);
      
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = maxWidth;
        const MAX_HEIGHT = maxHeight;
        let width = img.width;
        let height = img.height;
        let shouldResize = false;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
            shouldResize = true;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
            shouldResize = true;
          }
        }
        if (shouldResize) {
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if(ctx !== null){
            ctx.drawImage(img, 0, 0, width, height);
          }
          resolve(canvas.toDataURL("image/png", 0.9));
        } else {
          resolve(base64Str);
        }
      };
    });
  }