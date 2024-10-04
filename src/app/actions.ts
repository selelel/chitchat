import { env } from "@/config/env";

export const append_image = async (file: { fileList: { originFileObj: File; }[]; }, postId: string | Blob, token: string | undefined) => {
  const originFileObj = file.fileList.map((d: { originFileObj: File; }) => d.originFileObj)
  const formData = new FormData();

  for(const _file of originFileObj) formData.append('file', _file);
  formData.append('postId', postId);

  const appendImage = await fetch(`${env.BASE_API_URL}/post/appendImagePost`, {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!appendImage.ok) throw new Error("Can't get post")
  return true
};