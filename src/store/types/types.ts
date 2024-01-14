export default interface Book {
  id: string;
  title: string;
  authors?: string[];
  publishedDate: string;
  thumbnail: string;
  categories?: string[];
}
