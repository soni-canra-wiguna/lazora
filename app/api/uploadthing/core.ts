import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  products: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload

    console.log("file url", file.url)
  }),
  imageBanner: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
