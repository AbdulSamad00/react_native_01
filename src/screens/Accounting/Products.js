import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import apiClient from "../../api/client";
import { deleteProduct, getProduct, getProducts } from "../../api/products";
import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Datatable/AppTable";
import Header from "../../components/Header";

export default function Products() {
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const API_URL=apiClient.getBaseURL()
  useEffect(() => {
    const callForProducts = async () => {
      setCheckedProducts([]);
      setProducts([]);
      setLoading(true);
      const { ok, data } = await getProducts();
      if (ok) {
        
        const filterProducts = data.map((product) => {
          console.log(`th}`,product)
          return {
            id:product._id,
            Avatar:`${API_URL}/${product.productImage[0]?.filePath}`,
            Name:product.name,
            Category:product.category,			
            ProductNo:product.productNo?product.productNo:"",
            Brand:product.brand,			
            Price:product.price,            
            MadeIn:product.madeIn,            			
            Quantity:product.quantity,            			
		      	Barcode:product.barcode,
            ExpiredDate:moment(product.expiredDate).format("DD/MM/YYYY"),
            ProductType:product.productType,
            Description:product.description,
			      SKU:product.SKU,
            UPC:product.UPC,
            ISBN:product.ISBN,
            EAN:product.EAN,
            Reference:product.reference,
            Note:product.note,
            CreatedOn:moment(product.createdOn).format("DD/MM/YYYY"),
            Status:product.status,
          };
        });
        setProducts(filterProducts);
        setLoading(false);
      }
    };
    callForProducts();
  }, [update]);
  const onChangeSearch = () => {
    const filtered = products.filter(
      (el) =>
        `${el.Productname}`.toLowerCase().startsWith(search.toLowerCase()) ||
        `${el.Email}`.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchedProducts(filtered);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={loading} />
      <Header back title={"Products"} rightComponent={()=>{}} />
      <IconBar
        //setShowModal={setShowModal}
        checkedProducts={checkedProducts}
        setCheckedProducts={setSelectedProduct}
        //setSelectedProduct={setSelectedProduct}
        setUpdate={setUpdate}
        update={update}
      />
      <Searchbar
        style={styles.search}
        underlineColorAndroid="white"
        placeholder="Search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={(search) => {
          if (search.length < 1) {
            setSearchedProducts();
          } else {
            setSearch(search);
            onChangeSearch();
          }
        }}
      />
      {products && products.length > 0 && (
        <Table
          tableData={
            searchedProducts && searchedProducts.length > 0 ? searchedProducts : products
          }
          showCheckbox
          checked={checkedProducts}
          setChecked={setCheckedProducts}
        />
      )}
      </SafeAreaView>
    </View>
  );
}

const IconBar = ({
  //setShowModal,
  checkedProducts,
  setCheckedProducts,
  //setSelectedProduct,
  setUpdate,
  update,
}) => {
  return (
    <View style={{ height: 60, justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton
          icon="plus"
          style={{ marginLeft: 8, backgroundColor: "#07f" }}
          color="white"
          onPress={() => {}
           //redirect
          }
        />
        <IconButton
          icon="eye"
          style={{ marginLeft: 8, backgroundColor: "blue" }}
          color="white"
        />
		
        <IconButton
          icon="pencil"
          style={{ marginLeft: 8, backgroundColor: "yellow" }}
          color="black"
          onPress={async () => {
            if (checkedProducts.length.length === 0) {
              return;
            }

            const { ok, data } = await getProduct(checkedProducts[0]);
            if (ok) {
              const cleanProduct = {
			//     _id: data._id,
            // avatar: `${API_URL}/${product.productImage[0]?.filePath}`,
            ProductNo: product.productNo?product.productNo:"",
            Code: product.code,
            Price: product.price,
            Description: product.description,
            ValidTill: moment(product.validTill).format("DD MM YYYY"),
            Note: product.note,
            Status: product.status,
              };
              navigation.navigate("OperationsProduct", {
                selectedProduct: cleanProduct,
              });
            }
          }}
        />
        <IconButton
          icon="delete"
          style={{ marginLeft: 8, backgroundColor: "#f44" }}
          color="white"
          onPress={() => {
            if (checkedProducts.length < 1) return null;
            checkedProducts.forEach(async (productId) => {
              const { ok } = await deleteProduct(productId);
              if (ok) {
                console.log("deleted");
              }
            });

            setUpdate(!update);
          }}
        />
        <IconButton
          icon="file-delimited"
          style={{ marginLeft: 8, backgroundColor: "lime" }}
          color="white"
        />
        <IconButton
          icon="file-pdf-box"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="microsoft-excel"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
        <IconButton
          icon="printer"
          style={{ marginLeft: 8, backgroundColor: "brown" }}
          color="white"
        />
        <IconButton
          icon="cloud-upload"
          style={{ marginLeft: 8, backgroundColor: "cyan" }}
          color="black"
        />
        <IconButton
          icon="lock"
          style={{ marginLeft: 8, backgroundColor: "red" }}
          color="white"
        />
        <IconButton
          icon="lock-open"
          style={{ marginLeft: 8, backgroundColor: "green" }}
          color="white"
        />
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 5,
    width: "100%",
  },
  search: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});
