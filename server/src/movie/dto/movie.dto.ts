export class MovieResponseDto {
  id: string;
  title: string;
  filePath: string;
  year: string;
  owner: {
    id: string;
    email: string;
  };
}
