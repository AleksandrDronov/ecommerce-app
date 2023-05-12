import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tab, Tabs } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = async () => {
    const response = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`
    );
    const itemJson = await response.json();

    setItem(itemJson.data);
  };

  const getItems = async () => {
    const response = await fetch(
      "http://localhost:1337/api/items?populate=image"
    );
    const itemsJson = await response.json();

    setItems(itemsJson.data);
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); //eslint-disable-line

  return (
    <Box component="main" width="80%" m="80px auto">
      <Box component="section" display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
          />
        </Box>
        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Typography>Home/Item</Typography>
            <Typography>Prev Next</Typography>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h3" fontWeight="bold">{item?.attributes?.name}</Typography>
            <Typography fontWeight="bold">
              ${item?.attributes?.price}
            </Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                p: "10px 40px",
                ":hover": {
                  backgroundColor: shades.primary[300],
                },
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box display="flex" m="20px 0 5px 0">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>
              CATEGORIES:{" "}
              {item?.attributes?.category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box component="section" m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
        {value === "description" && <p>{item?.attributes?.longDescription}</p>}
        {value === "reviews" && <p>reviews</p>}
      </Box>

      {/* RELATED ITEMS */}
      <Box component="section" mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">Related Products</Typography>
        <Box
          display="flex"
          mt="20px"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-betweens"
        >
          {items.slice(0, 4).map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`}/>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
