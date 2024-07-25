import {
  Image,
  useColorScheme,
  StyleSheet,
  type ImageProps,
  ImageStyle,
} from "react-native";

type ThemedLogoProps = ImageProps & {
  style?: ImageStyle;
};

export default function ThemedLogo({ style, ...rest }: ThemedLogoProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <Image
      source={
        theme === "light"
          ? require("../../assets/images/logo.png")
          : require("../../assets/images/logo-dark.png")
      }
      {...rest}
      style={[styles.logo, style]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
  },
});
