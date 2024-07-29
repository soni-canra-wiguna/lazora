"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CATEGORIES } from "@/constants/categories"
import { formatToIDR } from "@/utils/format-to-idr"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { X } from "lucide-react"
import { FormEvent, useState } from "react"
import LoadingButton from "@/components/buttons/loading-button"
import TextEditor from "@/components/text-editor"
import parse from "html-react-parser"
import { useRouter } from "next/navigation"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import { useUserClient } from "@/hook/use-user"
import { Role } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"

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
  const router = useRouter()
  const { session } = useUserClient()
  const isViewer = session?.user.role === Role.VIEWER

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
      ({ title }) => title === titleCategory,
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
      ({ title }) => title === categoryByInput,
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

  const { mutate: crateProduct, isPending } = useMutation({
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
      // invalidate queries
      queryClient.invalidateQueries({
        queryKey: ["products"],
      })
      queryClient.invalidateQueries({
        queryKey: ["shuffle-products"],
      })
      router.push("/dashboard/products")
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
      if (isViewer) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to perform this action.",
          variant: "destructive",
        })
      } else {
        crateProduct(dataSubmission)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mb-32 min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-7xl flex-col gap-5"
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
        <div className="grid w-full grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price">price</Label>
            <div className="flex w-full items-center gap-4">
              <Input
                required
                id="price"
                type="number"
                value={price}
                min={0}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
              <div className="flex h-full w-full items-center bg-secondary px-2">
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
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex w-full flex-col gap-1.5">
            <Label htmlFor="description">description</Label>
            <TextEditor value={description} setValue={setDescription} />
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Label htmlFor="description">preview description</Label>
            <div className="prose h-[500px] w-full overflow-y-auto border border-primary p-2">
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
          <div className="flex w-full items-center gap-4">
            {imageProducts?.map((image, index) => (
              <div key={index} className="h-20 w-20 overflow-hidden">
                <Image
                  src={image.image}
                  alt={title}
                  className="size-full object-cover object-center"
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
          <div className="flex w-full flex-col bg-secondary p-4">
            <div className="flex w-full flex-wrap items-center gap-3 bg-secondary">
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
            <hr className="my-4 h-px w-full border-muted-foreground/30" />

            <div className="flex flex-col gap-2">
              <p>tambahkan category</p>
              <div className="flex w-full flex-wrap items-center gap-2">
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
            <hr className="my-4 h-px w-full border-muted-foreground/30" />

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
