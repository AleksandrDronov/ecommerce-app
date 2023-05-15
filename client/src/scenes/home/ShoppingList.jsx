import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";


const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.cart.items);
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItems = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/items?populate=image`
    );
    const itemsJson = await response.json();

    dispatch(setItems(itemsJson.data));
  };

  useEffect(() => {
    getItems();
  }, []); //eslint-disable-line

  const topRatedItems = items?.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items?.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items?.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <Box component="section" width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none"}}}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer" : {
            flexWrap: "wrap"
          }
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        gap="20px 1.33%"
      >
        {value === "all" && items.map((item) => (
          <Item item={item} key={`${item.attributes.name}-${item.id}`}/>
        ))}
        {value === "newArrivals" && newArrivalsItems.map((item) => (
          <Item item={item} key={`${item.attributes.name}-${item.id}`}/>
        ))}
        {value === "bestSellers" && bestSellersItems.map((item) => (
          <Item item={item} key={`${item.attributes.name}-${item.id}`}/>
        ))}
        {value === "topRated" && topRatedItems.map((item) => (
          <Item item={item} key={`${item.attributes.name}-${item.id}`}/>
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
