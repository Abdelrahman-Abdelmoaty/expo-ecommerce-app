import { StyleSheet, Text, View, Image, Alert, Pressable } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

import { defaultPizzaImage } from "@/components/ProductListItem";
import getProduct from "@/api/products/get-product";
import {
  useInsertProduct,
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import ThemedScrollView from "@/components/ui/ThemedScrollView";
import ThemedButton from "@/components/ui/ThemedButton";
import Input from "@/components/ui/Input";
import ThemedText from "@/components/ui/ThemedText";

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
});

export default function CreateProductScreen() {
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const { data: product } = isUpdating ? useProduct(+id) : {};

  const form = useForm<z.infer<typeof createProductSchema>>({
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

  const onSubmit = async (data: z.infer<typeof createProductSchema>) => {
    if (isUpdating) {
      await onUpdate(data);
    } else {
      await onCreate(data);
    }
  };

  const onCreate = async (data: z.infer<typeof createProductSchema>) => {
    const imagePath = await uploadImage();

    createProduct(
      {
        name: data.name,
        price: +data.price,
        image: imagePath,
      },
      {
        onSuccess: () => {
          form.reset();
          setImage("");
          router.back();
        },
      }
    );
  };

  const onUpdate = async (data: z.infer<typeof createProductSchema>) => {
    if (!id) return;

    const imagePath = await uploadImage();

    updateProduct(
      {
        id: +id,
        name: data.name,
        price: +data.price,
        image: imagePath,
      },
      {
        onSuccess: () => {
          form.reset();
          setImage("");
          router.back();
        },
      }
    );

    form.reset();
    setImage("");
  };

  const onDelete = () => {
    if (!id) return;

    deleteProduct(+id, {
      onSuccess: () => {
        form.reset();
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

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType: "image/png" });

    if (data) {
      return data.path;
    }
  };

  return (
    <FormProvider {...form}>
      <ThemedScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Stack.Screen
          options={{ title: isUpdating ? "Update Product" : "Create Product" }}
        />

        <Pressable onPress={pickImage}>
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
          />

          <ThemedText style={styles.selectImage}>Select Image</ThemedText>
        </Pressable>

        <View style={{ gap: 15 }}>
          <Input name="name" label="Name" defaultValue={product?.name} />
          <Input
            name="price"
            label="Price"
            keyboardType="number-pad"
            defaultValue={product?.price.toString()}
          />

          <ThemedButton
            text={isUpdating ? "Update" : "Create"}
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          />
          {isUpdating && (
            <ThemedButton
              text="Delete"
              onPress={confirmDelete}
              disabled={form.formState.isSubmitting}
            />
          )}
        </View>
      </ThemedScrollView>
    </FormProvider>
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
    marginBottom: 10,
  },
  selectImage: {
    fontSize: 20,
    color: "grey",
    alignSelf: "center",
    fontFamily: "LatoBold",
    marginBottom: 20,
  },
});
