import { StyleSheet, Text, View, TextInput, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";

export default function CreateProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { id } = useLocalSearchParams();

  const isUpdating = !!id;

  useEffect(() => {
    if (isUpdating) {
      const product = products.find((product) => product.id.toString() === id);
      if (product) {
        setName(product.name);
        setPrice(product.price.toString());
        setImage(product.image);
      }
    }
  }, []);

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    // Create the product
    console.log(name, price);
    resetFields();
  };

  const onUpdate = () => {
    // Update the product
    console.log(name, price);
    resetFields();
  };

  const resetFields = () => {
    setName("");
    setPrice("");
    setImage("");
  };

  const confirmDelete = () => {
    // Show an alert to confirm the delete
    console.log("Delete");
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  const onDelete = () => {
    // Delete the product
    console.log("Delete confirmed");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.selectImage}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && <Button text="Delete" onPress={confirmDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  selectImage: {
    fontSize: 16,
    color: "grey",
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
  },
});
