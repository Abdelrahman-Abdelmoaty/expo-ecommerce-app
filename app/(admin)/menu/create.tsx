import { StyleSheet, Text, View, TextInput, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@/components/Button";
import getProduct from "@/api/products/get-product";
import {
  useInsertProduct,
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
});

export default function CreateProductScreen() {
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const { data: product } = isUpdating ? useProduct(+id) : {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: isUpdating ? product?.name : "",
      price: isUpdating ? product?.price.toString() : "",
    },
  });
  const [image, setImage] = useState<string>(
    isUpdating && product?.image ? product?.image : ""
  );
  const { mutate: createProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const router = useRouter();

  useEffect(() => {
    if (isUpdating) {
      const fetchProduct = async () => {
        const product = await getProduct(+id);
        if (product) {
          setImage(product.image || defaultPizzaImage);
        }
      };
      fetchProduct();
    }
  }, []);

  const onSubmit = (data: z.infer<typeof createProductSchema>) => {
    if (isUpdating) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
  };

  const onCreate = async (data: z.infer<typeof createProductSchema>) => {
    createProduct(
      {
        name: data.name,
        price: +data.price,
        image: image,
      },
      {
        onSuccess: () => {
          reset();
          setImage("");
          router.back();
        },
      }
    );
  };

  const onUpdate = (data: z.infer<typeof createProductSchema>) => {
    if (!id) return;

    updateProduct(
      {
        id: +id,
        name: data.name,
        price: +data.price,
        image: image,
      },
      {
        onSuccess: () => {
          reset();
          setImage("");
          router.back();
        },
      }
    );

    reset();
    setImage("");
  };

  const onDelete = () => {
    if (!id) return;

    deleteProduct(+id, {
      onSuccess: () => {
        reset();
        setImage("");
        router.back();
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <View>
        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text onPress={pickImage} style={styles.selectImage}>
          Select Image
        </Text>
      </View>

      <View>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Name"
              style={styles.input}
            />
          )}
        />
        {errors.name && <Text>{errors.name.message}</Text>}
      </View>

      <View>
        <Text style={styles.label}>Price</Text>
        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="9.99"
              style={styles.input}
              keyboardType="numeric"
            />
          )}
        />
        {errors.price && <Text>{errors.price.message}</Text>}
      </View>

      <Button
        text={isUpdating ? "Update" : "Create"}
        onPress={handleSubmit(onSubmit)}
      />
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
