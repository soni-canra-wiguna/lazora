"use client"

import { useToast } from "@/components/ui/use-toast"
import { getSingleProduct } from "@/utils/get-products"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DataSubmission } from "../_components/form-create-product"
import LoadingButton from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/utils/categories"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import PreviewImage from "../_components/preview-image"
import { Input } from "@/components/ui/input"
import TextEditor from "@/components/text-editor"
import { formatToIDR } from "@/utils/format-to-idr"
import parse from "html-react-parser"

const UpdateProductPage = ({ params }: { params: { updateId: string[] } }) => {
  const { updateId } = params
  const {
    data: dataProduct,
    isPending: pendingDataProduct,
    isError: errorDataProduct,
  } = getSingleProduct(updateId[0])
  const updateImages: any = dataProduct?.images?.map(
    ({ id, productId, ...image }) => image
  )
  const updateCategories: any = dataProduct?.categories?.map(
    ({ id, productId, ...title }) => title
  )
  const [title, setTitle] = useState(dataProduct?.title)
  const [price, setPrice] = useState(dataProduct?.price)
  const [description, setDescription] = useState(dataProduct?.description)
  const [stock, setStock] = useState(dataProduct?.stock)
  const [imageProducts, setImageProducts] = useState(updateImages)
  const [categories, setCategories] = useState(updateCategories)
  const [categoryByInput, setCategoryByInput] = useState("")
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  console.log(typeof dataProduct?.description)

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
      await axios.patch(`/api/products/${updateId[0]}`, data, {
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
        title: "product updated",
        description: "product successfully updated",
      })
      queryClient.invalidateQueries({ queryKey: [updateId[0]] })
      router.push("/")
    },
    onError: () => {
      console.log("failed update product")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
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

  if (pendingDataProduct) return <p className="pt-24">loading...</p>
  if (errorDataProduct) return <p className="pt-24">error nih...</p>

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 max-w-7xl mx-auto py-24"
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
        <div className="flex flex-col gap-1.5">
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
    </>
  )
}

export default UpdateProductPage
