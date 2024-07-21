# Lazora | Open Source E-commerce Project

Lazora is a powerful and user-friendly e-commerce application built with Next.js and Prisma ORM. It offers a seamless shopping experience with features like user authentication, product management, favourites, filtering products, and [more](https://honorable-level-700.notion.site/Lazora-Canban-Board-caaf4efc291d4f33a655ca8f4fbf5191).

### Concept Application:

Unlike multi-vendor platforms where each user can create their own store, Lazora focuses on providing a unified store managed by a single seller. The seller has the ability to perform CRUD (Create, Read, Update, Delete) operations on products and banners, ensuring a streamlined and controlled shopping experience for customers. This app offers user authentication, product management, and secure payment processing (planning feature), making it an ideal solution for businesses looking to manage their e-commerce operations efficiently.

> _Warning! This app is still in development and not ready for production._
>
> _Before you clone, please see my [Roadmap](https://honorable-level-700.notion.site/Lazora-Canban-Board-caaf4efc291d4f33a655ca8f4fbf5191)_

## Live Demo

https://lazora.vercel.app

## Preview Image

[![homepage view](https://utfs.io/f/e5d0cc62-24ba-4f9c-b8c6-ea84ebe995bc-g5xubk.png)](https://lazora.vercel.app)
[![register view](https://utfs.io/f/a180af47-817a-42b9-928e-ce00ca6eeb74-jjwavf.png)](https://lazora.vercel.app/register)
[![detail product view](https://utfs.io/f/118f01e3-7115-4b00-9ca2-13cc0a0fadb6-fd91lr.png)](https://lazora.vercel.app/p/akko-v3-creamy-yellow-pro-switch/6655ec671a15e42427586958)
[![dashboard products view](https://utfs.io/f/48ccbcfb-563b-4f65-af92-480b1eb3fbac-fd9285.png)](https://lazora.vercel.app/dashboard)

## Run Locally

### 1. Install Dependencies

```shell
npm install
```

### 2. Configure ENV file

Create an `.env` file and add the following variables.
See file `example.env` for more information. For a detailed guide on setting up these variables, read my [article](https://canra.vercel.app/blog/ultimate-guide-on-how-to-deploy-a-nextjs-project-lazora-app-to-vercel/0ac6475c-edbb-4563-9d14-af538e15cd59).

```env
DATABASE_URL=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
PROD_URL=""
DEV_URL="htpp://locahost:3000"
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
REDIS_URL=""
GOOGLE_SITE_VERIFICATION=""
CI=false
```

### 3. Generate and Push Database Schema

Run the following command to generate and push your prisma model to the database.

```sh
npx prisma generate && npx prisma db push
```

### 4. Run Development Server

```sh
npm run dev
```

---

## Deploy to Vercel

Read my article to see how to deploy this app to Vercel. Read [here](https://canra.vercel.app/blog/ultimate-guide-on-how-to-deploy-a-nextjs-project-lazora-app-to-vercel/0ac6475c-edbb-4563-9d14-af538e15cd59).

---

## How to Access the Dashboard to Perform CRUD Operations

1. Navigate to your site at `/register`.
2. Create an account for yourself.
3. Go to your MongoDB database, then go to the users collection and edit the account you've just created. Change the role from `BUYER` to `SELLER` and save.
4. Finally, go to your site, log out, and sign in again to see the changes.
5. Congratulations, you can now access the dashboard.

## License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.

## API spec
read [API spec](./API-SPEC.md)
