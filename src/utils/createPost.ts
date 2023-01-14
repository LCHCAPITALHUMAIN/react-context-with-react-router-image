import { client, ResponseAPI } from "../api/client";

export const createPost = (file: any): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fd = new FormData();
      fd.append("image", file, file.name);
      const { data } = await client.post("", fd);
      resolve(data.image);
    } catch (error) {
      reject(error);
    }
  });
};
