import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MCQInterview = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  const questions = [
    {
      id: 1,
      question: "What is the virtual DOM in React?",
      options: [
        "A lightweight copy of the actual DOM",
        "A database for React components",
        "A CSS framework",
        "A testing library",
      ],
      correct: 0,
    },
    {
      id: 2,
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1,
    },
    {
      id: 3,
      question: "What is TypeScript primarily used for?",
      options: [
        "Adding static types to JavaScript",
        "Creating animations",
        "Building databases",
        "Managing state",
      ],
      correct: 0,
    },
    {
      id: 4,
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      correct: 1,
    },
    {
      id: 5,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Character", "Number"],
      correct: 2,
    },
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const score = Object.entries(answers).reduce((acc, [questionIndex, answer]) => {
      const question = questions[Number(questionIndex)];
      return acc + (Number(answer) === question.correct ? 1 : 0);
    }, 0);

    const percentage = (score / questions.length) * 100;

    if (percentage >= 60) {
      toast.success(`Congratulations! You scored ${percentage}%. Moving to AI Interview.`);
      setTimeout(() => navigate("/interview/ai"), 1500);
    } else {
      toast.error(`You scored ${percentage}%. Unfortunately, you didn't pass this round.`);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Onboardly
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
            </span>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Interview
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Round 1: Technical Assessment</CardTitle>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <Progress value={progress} className="mb-2" />
            <CardDescription>Answer all questions to proceed to the next round</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
              <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={String(index)} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length}>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Test
                </Button>
              ) : (
                <Button onClick={handleNext}>Next Question</Button>
              )}
            </div>

            {/* Question Navigator */}
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">Question Navigator</p>
              <div className="flex flex-wrap gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg border font-medium transition-colors ${
                      currentQuestion === index
                        ? "bg-primary text-primary-foreground"
                        : answers[index] !== undefined
                        ? "bg-success text-success-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCQInterview;
