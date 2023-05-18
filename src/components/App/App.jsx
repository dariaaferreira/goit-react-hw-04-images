import React, { useState, useEffect } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { fetchImages } from "../../api/fetchApi";
import { Container } from "./App.styled";
import { Loader } from "../Loader/Loader";

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchData(query, page);
  }, [query, page]);

  const fetchData = (query, page) => {
    setIsLoading(true);
    fetchImages(query, page)
      .then((fetchedImages) => {
        if (fetchedImages.length > 0) {
          setQuery(query);
          setPage(page);
          setImages((prevImages) => [...prevImages, ...fetchedImages]);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchSubmit = (submittedQuery) => {
    setQuery(submittedQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <Container>
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader visible={isLoading} />}
        {images.length > 0 && !isLoading && (
          <Button onClick={handleLoadMore} />
        )}
      </Container>
    </>
  );
};
