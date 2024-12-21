import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create.review.action";

// hidden만 사용한다면 onChange 함수에 대한 오류 발생으로 readOnly 까지 사용!
export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
