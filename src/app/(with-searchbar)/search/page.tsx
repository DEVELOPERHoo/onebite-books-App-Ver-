import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  // 실시간 사용자의 검색어 기반으로 데이터를 가져와야 하기 때문에
  // 풀라우트 캐시는 이용을 못하지만 실시간 생성 속도를 줄이고자 데이터 캐시 사용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense
      key={(await searchParams).q || ""}
      fallback={<div>Loading...</div>}
    >
      <SearchResult q={(await searchParams).q || ""} />
    </Suspense>
  );
}
