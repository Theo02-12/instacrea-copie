"use client";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import { toast } from "react-toastify";

interface Props {
  productId: string;
  initialValue?: {
    rating: number;
    comment: string;
  };
}

export default function ReviewForm({ productId, initialValue }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });


  const submitReview: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { rating, comment } = review;
    if (!rating) return toast.error("Note manquante !");
    setIsPending(true);
    const res = await fetch("/api/product/review", {
      method: "POST",
      body: JSON.stringify({ productId, rating, comment }),
    });
    setIsPending(false);

    const { error } = await res.json();

    if (!res.ok) {
      return toast.error(error);
    }
  };

  useEffect(() => {
    if (initialValue) {
      setReview({ ...initialValue });
    }
  }, [initialValue]);

  return (
    <form onSubmit={submitReview}>
      <h1>Ta note sur 5</h1>
      <Rating
        unratedColor="red"
        ratedColor="red"
        onChange={(rating) => setReview({ ...review, rating })}
        value={initialValue?.rating || review.rating}
      />
      <div className="flex flex-col">
        <h2>Ton message</h2>
        <textarea
          name="comment"
          placeholder="Leave a comment !"
          className="border border-black p-2 rounded"
          required
          value={review.comment}
          onChange={({ target }) =>
            setReview({ ...review, comment: target.value })
          }
        ></textarea>
        <button type="submit" className={`bg-blue-500 text-white p-2 rounded my-3 ${isPending ? 'bg-blue-200' : ''}`} disabled={isPending}>
          Envoyer
        </button>
      </div>
    </form>
  );
}
