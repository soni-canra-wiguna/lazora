import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  products: f({
    image: { maxFileSize: "8MB", maxFileCount: 8 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url)
  }),
  imageBanner: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
