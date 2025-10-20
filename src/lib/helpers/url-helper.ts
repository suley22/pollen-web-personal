export const UrlHelper = {
  formatUrl,
};

// Helper function to ensure URL has proper protocol
function formatUrl(url) {
  if (!url) return null;
  // If URL doesn't start with http:// or https://, add https://
  if (!url.match(/^https?:\/\//i)) {
    return `https://${url}`;
  }
  return url;
}
