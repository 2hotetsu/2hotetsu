export function extractYouTubeId(url: string): string {
  // Handles various YouTube URL formats and returns the video ID.
  // Examples:
  //  - https://www.youtube.com/watch?v=ABC123xyz
  //  - https://youtu.be/ABC123xyz
  //  - https://www.youtube.com/embed/ABC123xyz
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
