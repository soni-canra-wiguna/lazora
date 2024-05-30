"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CATEGORIES } from "@/data/categories"
import { formatToIDR } from "@/utils/format-to-idr"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { X } from "lucide-react"
import { FormEvent, useState } from "react"
import LoadingButton from "@/components/loading-button"
import TextEditor from "@/components/text-editor"
import parse from "html-react-parser"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"

export interface DataSubmission {
  title: string
  price: number
  description: string
  stock: number
  images: {
    image: string
  }[]
  categories: {
    title: string
  }[]
}

const CreateProductPage = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState(0)
  const [imageProducts, setImageProducts] = useState([
    {
      image: "",
    },
  ])
  const [categories, setCategories] = useState([
    {
      title: "keyboard",
    },
  ])
  const [categoryByInput, setCategoryByInput] = useState("")
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const handleAddImage = () => {
    setImageProducts([
      ...imageProducts,
      {
        image: "",
      },
    ])
  }

  const handleDeleteImage = (indexImage: number) => {
    const newImage = [...imageProducts]
    newImage.splice(indexImage, 1)

    setImageProducts(newImage)
  }

  const handleAddCategoryDefault = (titleCategory: string) => {
    const isCategoryExist = categories.some(
      ({ title }) => title === titleCategory
    )

    if (!isCategoryExist) {
      const newCategory = { title: titleCategory }
      setCategories([...categories, newCategory])
    } else {
      alert("kategory udah ada nih")
    }
  }

  const handleAddCategoryByInput = () => {
    const isCategoryExist = categories.some(
      ({ title }) => title === categoryByInput
    )
    if (!isCategoryExist) {
      const newCategoryByInput = { title: categoryByInput }
      setCategories([...categories, newCategoryByInput])
      setCategoryByInput("")
    } else {
      alert("category udah ada nih")
    }
  }

  const handleDeleteCategory = (index: number) => {
    const newCategory = [...categories]
    newCategory.splice(index, 1)
    setCategories(newCategory)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: DataSubmission) => {
      await axios.post("/api/products", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      setTitle("")
      setPrice(0)
      setDescription("")
      setStock(0)
      setImageProducts([{ image: "" }])
      setCategories([{ title: "fashion" }])
      toast({
        title: "product created",
        description: "product successfully created",
      })
      queryClient.invalidateQueries({ queryKey: ["products"] })
      router.push("/")
    },
    onError: () => {
      console.log("failed post product")
    },
  })

  const handleSubmit = (e: FormEvent) => {
    try {
      e.preventDefault()
      const dataSubmission = {
        title,
        price,
        description,
        stock,
        images: imageProducts,
        categories,
      }
      mutate(dataSubmission)
      // console.log(dataSubmission)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mb-32 min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 max-w-7xl mx-auto"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">title</Label>
          <Input
            required
            id="title"
            type="text"
            value={title}
            placeholder="title product"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/*  */}
        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price">price</Label>
            <div className="flex w-full gap-4 items-center">
              <Input
                required
                id="price"
                type="number"
                value={price}
                min={0}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
              <div className="w-full h-full flex items-center px-2 bg-secondary">
                {formatToIDR(price)}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stock">stock</Label>
            <Input
              required
              id="stock"
              type="number"
              value={stock}
              min={0}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col w-full gap-1.5">
            <Label htmlFor="description">description</Label>
            <TextEditor value={description} setValue={setDescription} />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Label htmlFor="description">preview description</Label>
            <div className="w-full border border-primary h-[500px] overflow-y-auto prose p-2">
              {parse(description)}
            </div>
          </div>
        </div>
        {/* image start */}
        {/* <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <Label>images product</Label>
            <Button type="button" size="icon" onClick={handleAddImage}>
              <Plus className="size-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {imageProducts?.map((imgUrl, indexImg) => (
              <div
                key={indexImg + 1}
                className="flex items-center w-full gap-4"
              >
                <Input
                  required
                  type="text"
                  value={imgUrl.image}
                  placeholder={`image url ${indexImg + 1}`}
                  onChange={(e) => {
                    const newImage = [...imageProducts]
                    newImage[indexImg].image = e.target.value
                    setImageProducts(newImage)
                  }}
                />
                <PreviewImage imageUrl={imageProducts[indexImg].image} />
                <Button
                  variant="secondary"
                  type="button"
                  size="icon"
                  onClick={() => handleDeleteImage(indexImg)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex flex-col gap-1.5">
          <Label>images</Label>
          <UploadDropzone
            endpoint="products"
            onClientUploadComplete={(res) => {
              if (!res) return
              setImageProducts(res.map((image) => ({ image: image.url })))
              // form.setValue("image", res[0].url)
              toast({
                title: "succes uploaded",
                variant: "success",
              })
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "failed to upload",
                description: `something went wrong`,
                variant: "destructive",
              })
            }}
          />
          <div className="flex w-full gap-4 items-center">
            {imageProducts?.map((image, index) => (
              <div key={index} className="w-20 h-20 overflow-hidden">
                <Image
                  src={image.image}
                  alt={title}
                  className="size-full object-center object-cover"
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div>
        </div>
        {/* image end */}
        {/* categories start */}
        <div className="flex flex-col gap-1.5">
          <Label>category product</Label>
          <div className="flex flex-col w-full bg-secondary p-4">
            <div className="flex items-center gap-3 flex-wrap w-full bg-secondary">
              {categories?.map(({ title }, indexCategory) => (
                <Button
                  type="button"
                  key={indexCategory + 1}
                  className=""
                  onClick={() => handleDeleteCategory(indexCategory)}
                >
                  {title}
                  <X className="ml-2 size-4" />
                </Button>
              ))}
            </div>
            <hr className="border-muted-foreground/30 h-px w-full my-4" />

            <div className="flex flex-col gap-2">
              <p>tambahkan category</p>
              <div className="flex flex-wrap gap-2 items-center w-full">
                {CATEGORIES?.map(({ title }, indexList) => {
                  return (
                    <Button
                      onClick={() => handleAddCategoryDefault(title)}
                      type="button"
                      key={indexList}
                      className={`${
                        categories.some((cat) => cat.title === title) &&
                        "hidden"
                      }`}
                    >
                      {title}
                    </Button>
                  )
                })}
              </div>
            </div>
            <hr className="border-muted-foreground/30 h-px w-full my-4" />

            <div className="flex flex-col gap-2">
              <p>tambahkan category baru</p>
              <div className="flex items-center gap-4">
                <Input
                  value={categoryByInput}
                  className="border border-primary"
                  placeholder="tambahkan category baru"
                  onChange={(e) => setCategoryByInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                    }
                  }}
                />
                <Button
                  type="button"
                  disabled={categoryByInput === ""}
                  onClick={handleAddCategoryByInput}
                >
                  add category
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* categories end */}
        <LoadingButton type="submit" loading={isPending} disabled={isPending}>
          add product
        </LoadingButton>
      </form>
    </div>
  )
}

export default CreateProductPage
