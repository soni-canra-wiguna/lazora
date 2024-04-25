// @ts-nocheck

"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  CalendarIcon,
  PlusCircle,
  Trash2Icon,
  X,
  FileText,
  BookOpen,
} from "lucide-react"
import { Card } from "./ui/card"
import { useToast } from "./ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ExamProps } from "@/type"
import LoadingButton from "./loading-button"
import { cn } from "@/lib/utils"
import { inputOptions } from "@/schema/input-options"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import CustomTooltip from "./custom-tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUserClient } from "@/hook/use-user"

export default function ExamFormPost() {
  const session = useUserClient()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(
    // localStorage.getItem("title") ||
    ""
  )
  const [description, setDescription] = useState("")
  const [classroom, setClassroom] = useState("all")
  const [questions, setQuestions] = useState(
    // JSON.parse(localStorage.getItem("questions")) ||
    [
      {
        content: "",
        points: "10",
        correctAnswer: "",
        options: [{ content: "" }],
      },
    ]
  )
  const [dateSelected, setDateSelected] = useState<Date | null>()

  // useEffect(() => {
  //   localStorage.setItem("title", title)
  //   localStorage.setItem("questions", JSON.stringify(questions))
  // }, [title, questions])

  function handleAddQuestion() {
    setQuestions([
      ...questions,
      {
        content: "",
        points: "10",
        correctAnswer: "",
        options: [{ content: "" }],
      },
    ])
  }

  const handleDeleteQuestion = (questionIndex: number) => {
    const newQuestions = [...questions]
    // disini .splice berfungsi buat ngehapus dan 1 itu berapa item yang mau di hapus
    // juga untuk questionIndex itu kita mau hapus questionnya berdasarkan index pake methode .splice
    newQuestions.splice(questionIndex, 1)
    setQuestions(newQuestions)
  }

  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push({
      content: "",
    })
    setQuestions(newQuestions)
  }

  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.splice(optionIndex, 1)
    setQuestions(newQuestions)
  }

  const handleSelectCorrectOption = (
    questionIndex: number,
    option: {
      content: string
    }
  ) => {
    const newOptions = [...questions]
    const selectedOptionContent = option.content
    if (newOptions[questionIndex].correctAnswer !== selectedOptionContent) {
      newOptions[questionIndex].correctAnswer = selectedOptionContent
    }
    setQuestions(newOptions)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ExamProps) => {
      await axios.post("/api/exams", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      toast({
        title: "ujian ditambahkan.",
        description: "ujian berhasil di tambahkan!!",
      })
      // Reset form
      setTitle("")
      setDescription("")
      setClassroom("")
      setDateSelected(undefined)
      setQuestions([
        {
          content: "",
          points: "10",
          correctAnswer: "",
          options: [{ content: "" }],
        },
      ])
      queryClient.invalidateQueries({ queryKey: ["examsData"] })
    },
    onError: () => {
      toast({
        title: "gagal ditambahkan.",
        description: "ujian gagal di tambahkan!!",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      // console.log({
      //   title,
      //   description,
      //   date: dateSelected,
      //   classroom,
      //   questions,
      // })
      mutate({
        userId: session?.user.id,
        title,
        description,
        date: dateSelected,
        classroom,
        questions,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const borderBottom =
    "border-x-0 border-t-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-transparent focus:border-primary p-0"

  return (
    <>
      <div className="max-w-2xl w-full mx-auto mb-32">
        <form onSubmit={onSubmit} className="w-full">
          <Card className="flex flex-col gap-6 p-6 relative overflow-hidden">
            <span className="absolute w-full h-2 top-0 bg-primary left-0" />
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Judul ujian"
              className={cn("h-12 text-xl font-medium", borderBottom)}
            />
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="deskripsi ujian"
              className={cn("", borderBottom)}
            />
            <div className="flex flex-row w-full h-full items-center justify-between my-4">
              <Select onValueChange={(value) => setClassroom(value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {inputOptions.classrooms.map((value) => (
                      <SelectItem
                        className="uppercase"
                        key={value}
                        value={value}
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <span className="w-[2px] h-5 bg-muted border-none mx-4" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal flex-1 w-full",
                      !dateSelected && "text-muted-foreground"
                    )}
                  >
                    {dateSelected ? (
                      format(dateSelected, "dd MMMM yyyy", { locale: id })
                    ) : (
                      <span>tanggal ujian</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    // @ts-ignore
                    selected={dateSelected}
                    onSelect={setDateSelected}
                    disabled={(date) => {
                      const today = new Date()
                      const isToday = new Date(today)
                      isToday.setDate(today.getDate() - 1)
                      return date < isToday
                    }}
                    // disabled={(date) => {
                    //   const today = new Date()
                    //   const nextWeek = new Date(today)
                    //   nextWeek.setDate(today.getDate() + 7)

                    //   return date < new Date() || date > nextWeek
                    // }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <div className="w-full my-8 flex items-center justify-center">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
          </div>
          {/* question */}
          {questions.map((question, questionIndex) => (
            <Card key={questionIndex} className="w-full flex flex-col mb-4">
              <div className="w-full items-center justify-end py-2 flex border-b px-6 mb-4 rounded-t-xl">
                <div className="flex items-center gap-4">
                  <Select
                    defaultValue={questions[questionIndex]?.points?.toString()}
                    onValueChange={(value) => {
                      const newQuestions = [...questions]
                      newQuestions[questionIndex].points = value
                      setQuestions(newQuestions)
                    }}
                  >
                    <CustomTooltip message="poin soal" side="left">
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="point" />
                      </SelectTrigger>
                    </CustomTooltip>
                    <SelectContent>
                      <SelectGroup>
                        {inputOptions.points.map((value) => (
                          <SelectItem
                            key={value.toString()}
                            value={value.toString()}
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* select point */}
                  <CustomTooltip message="hapus soal">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => handleDeleteQuestion(questionIndex)}
                      className="p-[0.01px]"
                    >
                      <Trash2Icon className="w-4 h-4 xt-muted-foreground" />
                    </Button>
                  </CustomTooltip>
                </div>
              </div>
              <div className="flex flex-col p-6 w-full gap-4">
                <Input
                  type="text"
                  placeholder="pertanyaan"
                  value={question.content}
                  onChange={(e) => {
                    const newQuestions = [...questions]
                    newQuestions[questionIndex].content = e.target.value
                    setQuestions(newQuestions)
                  }}
                  required
                  className="h-12"
                />

                <div className="w-full py-3" />

                {/* answer options */}
                {question.options.map((option, optionIndex) => {
                  return (
                    <div
                      key={optionIndex}
                      className="flex gap-4 items-center mb-3"
                    >
                      <CustomTooltip message="select option">
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectCorrectOption(questionIndex, option)
                          }
                          className="cursor-pointer relative border-2 rounded-full w-6 h-6"
                        >
                          {questions[questionIndex].correctAnswer ===
                            option.content &&
                            questions[questionIndex].correctAnswer !== "" && (
                              <span className="absolute w-3 h-3 bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            )}
                        </button>
                      </CustomTooltip>
                      <Input
                        type="text"
                        placeholder={`opsi ${optionIndex + 1}`}
                        value={option.content}
                        onChange={(e) => {
                          const newOptions = [...questions]
                          newOptions[questionIndex].options[
                            optionIndex
                          ].content = e.target.value
                          setQuestions(newOptions)
                        }}
                        required
                        className={cn("flex-1", borderBottom)}
                      />
                      <CustomTooltip message="hapus opsi">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() =>
                            handleDeleteOption(questionIndex, optionIndex)
                          }
                          className=""
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </CustomTooltip>
                    </div>
                  )
                })}
                <p
                  className="cursor-pointer underline underline-offset-4 text-sm text-muted-foreground w-max selection:bg-transparent"
                  onClick={() => handleAddOption(questionIndex)}
                >
                  tambahkan opsi
                </p>
              </div>
            </Card>
          ))}

          <Card className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 p-4 w-max">
            <CustomTooltip message="tambah pertanyaan">
              <Button
                className="capitalize"
                type="button"
                variant="outline"
                onClick={handleAddQuestion}
              >
                pertanyaan <PlusCircle className="size-4 ml-2" />
              </Button>
            </CustomTooltip>
            <LoadingButton
              className="w-full capitalize shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
              loading={isPending}
              disabled={isPending || questions.length < 5}
              type="submit"
            >
              buat ujian <FileText className="size-4 ml-2" />
            </LoadingButton>
          </Card>
        </form>
      </div>
    </>
  )
}
