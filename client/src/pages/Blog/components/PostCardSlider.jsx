import React from "react";
import PostCard from "./PostCard";
import MainSlider from "../../../components/MainSlider";


    // Categories data
const categories = [
  { id: 1, title: "All", color: "gray" },
  { id: 2, title: "paint", color: "orange" },
  { id: 3, title: "handmade", color: "lightBlue" },
  { id: 4, title: "art", color: "green" },
];


const data = [
  {
    id: 1,
    postImg:
      "https://images.stockcake.com/public/e/b/8/eb8b0b45-6510-46db-8e16-f26e48427624_large/focused-financial-analyst-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj",
    category: "paint",
  },
  {
    id: 2,
    postImg:
      "https://images.stockcake.com/public/8/9/4/8946259c-7d2e-4a7c-8f10-a9410762413a_large/cozy-library-nook-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj",
 category: "paint",

  },
  {
    id: 3,
    postImg:
      "https://images.stockcake.com/public/e/b/8/eb8b0b45-6510-46db-8e16-f26e48427624_large/focused-financial-analyst-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj ",
     category: "paint",

  },
  {
    id: 4,
    postImg:
      "https://images.stockcake.com/public/8/9/4/8946259c-7d2e-4a7c-8f10-a9410762413a_large/cozy-library-nook-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj ",
    category: "paint",

  },
];

const PostCardSlider = () => {
 return(
  <MainSlider  itemsSlider={data} 
      itemsPerSlide={3} 
            categories={categories}
shouldShowCategories={false}
      renderSlide={(item) => (
      <PostCard
        data={item} 
          postImg={item.postImg} 
          date={item.date} 
          comments={item.comments} 
          postTitle={item.postTitle} 
          link={`/products/${item.id}`}
          backgroundColor={categories.find(cat => cat.title === item.category)?.color || "gray"}
          Category={item.category} 
 
 
        />
      )} 
    />
 )
 
};

export default PostCardSlider;
