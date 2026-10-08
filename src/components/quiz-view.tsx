"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { quizQuestions } from "@/content";
import { useUno } from "@/lib/store";
import { Button } from "./ui/button";
import { Citations } from "./citations";
export function QuizView() {
  const s = useUno();
  const q = quizQuestions[s.quizIndex];
  const [choice, setChoice] = useState<Record<string, string>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const answer = s.quizAnswers[q.id];
  const score = quizQuestions.filter(
    (q) => s.quizAnswers[q.id] === q.correctChoiceId,
  ).length;
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [q.id, s.quizComplete]);
  if (s.quizComplete)
    return (
      <div className="quiz-view quiz-result">
        <div className="eyebrow">EXPLORATION COMPLETE</div>
        <h1 tabIndex={-1} ref={heading}>
          From recognition
          <br />
          <em>to understanding.</em>
        </h1>
        <div className="quiz-score">
          {score}
          <span>/ {quizQuestions.length}</span>
        </div>
        <p>
          You connected the board to the physics beneath it. Revisit any
          explanation or try the questions again.
        </p>
        <Button
          onClick={() => {
            s.resetQuiz();
            setChoice({});
          }}
        >
          <RotateCcw size={16} />
          Try again
        </Button>
        <Button variant="outline" onClick={() => s.setMode("explore")}>
          Back to the board
          <ArrowRight size={16} />
        </Button>
      </div>
    );
  return (
    <div className="quiz-view">
      <div className="quiz-progress">
        <span className="eyebrow">CHECK YOUR UNDERSTANDING</span>
        <span className="mono">
          {String(s.quizIndex + 1).padStart(2, "0")} / {quizQuestions.length}
        </span>
      </div>
      <progress
        max={quizQuestions.length}
        value={s.quizIndex + (answer ? 1 : 0)}
        aria-label="Quiz progress"
      />
      <form
        key={q.id}
        onSubmit={(e) => {
          e.preventDefault();
          if (choice[q.id]) s.answerQuiz(choice[q.id]);
        }}
      >
        <fieldset disabled={!!answer}>
          <legend>
            <span className="micro-label">{q.topic}</span>
            <h1 tabIndex={-1} ref={heading}>
              {q.prompt}
            </h1>
          </legend>
          <div className="quiz-choices">
            {q.choices.map((c, i) => (
              <label
                key={c.id}
                className={`quiz-choice ${choice[q.id] === c.id ? "is-selected" : ""} ${answer && c.id === q.correctChoiceId ? "is-correct" : ""}`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={c.id}
                  checked={choice[q.id] === c.id}
                  onChange={() => setChoice({ ...choice, [q.id]: c.id })}
                />
                <span className="choice-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{c.text}</span>
                {answer && c.id === q.correctChoiceId && <Check size={19} />}
              </label>
            ))}
          </div>
        </fieldset>
        {!answer && (
          <Button type="submit" disabled={!choice[q.id]}>
            Check answer
            <ArrowRight size={16} />
          </Button>
        )}
      </form>
      {answer && (
        <section className="quiz-feedback" aria-label="Answer explanation">
          <h2>
            {answer === q.correctChoiceId ? (
              <>
                <Check size={21} />
                That’s right.
              </>
            ) : (
              <>
                <X size={21} />
                Not quite. Here’s why.
              </>
            )}
          </h2>
          <p>{q.explanation}</p>
          <Citations ids={q.sourceRefs} />
          <Button onClick={s.nextQuestion}>
            {s.quizIndex === quizQuestions.length - 1
              ? "See your results"
              : "Next question"}
            <ArrowRight size={16} />
          </Button>
        </section>
      )}
    </div>
  );
}
