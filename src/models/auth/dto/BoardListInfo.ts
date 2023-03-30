export default interface boardListInfo {
  boardList: board[];
  totalPage: number;
  totalElement: number;
}

interface board {
  id: string;
  userId: number;
  userName: string;
  title: string;
  lyrics: string;
  uploadDate: string;
  uploadIp: string;
  imgUrl: string;
  musicUrl: string;
}
