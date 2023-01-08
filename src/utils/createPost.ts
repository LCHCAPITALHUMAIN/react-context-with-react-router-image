import { client, ResponseAPI } from "../api/client";

export const createPost = async (file: any): Promise<ResponseAPI> => {
  const fd = new FormData();
  fd.append("image", file, file.name);
  const { data } = await client.post("", fd);
  console.log(data);
  return data.image;
};
