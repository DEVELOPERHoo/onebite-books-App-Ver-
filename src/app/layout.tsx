import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

// 중복된 API 요청을 캐싱하는 리퀘스트 메모이제이션 동작
async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <footer>제작 @DEVELOPERHoo</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @DEVELOPERHoo</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
