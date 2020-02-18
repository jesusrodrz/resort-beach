import { createClient } from 'contentful';
export default function contentful() {
  return createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });
}
