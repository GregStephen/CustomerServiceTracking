export default function useBaseUrl(controller: string) {
  if (process.env.NODE_ENV === 'development') {
    return `https://localhost:44324/api/${controller}`;
  } else {
    return `https://servicetrackerapi.azurewebsites.net/api/${controller}`;
  }
}
