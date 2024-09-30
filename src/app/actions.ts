export const append_image = async (file: { fileList: { originFileObj: File; }[]; }, postId: string | Blob, token: string | undefined, api_url: string) => {
  const originFileObj = file.fileList.map((d: { originFileObj: File; }) => d.originFileObj)
  const formData = new FormData();

  for(const _file of originFileObj) formData.append('file', _file);
  formData.append('postId', postId);

  const appendImage = await fetch(`${api_url}/post/appendImagePost`, {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  console.log(appendImage)
  if (appendImage.ok) {
    const response_ = await fetch(`${api_url}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'GetPost',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include', // Enable sending cookies
      body: JSON.stringify({
        query: `
          mutation GetPost($postId: String!) {
            getPost(postId: $postId) {
              _id
              author {
                _id
              }
              content {
                description
                images
                text
              }
              audience
            }
          }
        `,
        variables: {
          postId: postId
        }
      })
    });

    const result = await response_.json();
    console.log(result);

    if (result.data) {
      return result.data.getPost
    } else {
      console.error("Error fetching post:", result.errors);
    }

  } else {
    throw new Error("Can't get post")
  }
};