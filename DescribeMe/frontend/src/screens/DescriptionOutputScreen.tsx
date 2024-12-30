import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Share,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/RootStackParamList";
import { colours } from "@/theme/colours";
import { fontSizes } from "@/theme/sizing";

// Import the IconButton
import { IconButton } from "@/components/inputs/buttons/IconButton";
import SaveIcon from "@/assets/save-icon.svg";
import ShareIconSvg from "@/assets/share-icon.svg";
import NewFileIcon from "@/assets/new-file-icon.svg";
import DescribeMeLogo from "@/assets/logos/describe-me-logo-coloured.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const DescriptionOutputScreen = ({ route }: any) => {
  const { image, caption } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const outputRef = useRef<View>(null);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(
      image,
      (originalWidth, originalHeight) => {
        const containerWidth = SCREEN_WIDTH * 0.8; // 80% of screen width
        const maxHeight = Dimensions.get("window").height * 0.6667; // 66.67% of screen height
        let calculatedHeight = (originalHeight / originalWidth) * containerWidth;

        if (calculatedHeight > maxHeight) {
          calculatedHeight = maxHeight;
          const adjustedWidth = (originalWidth / originalHeight) * calculatedHeight;
          setImageSize({ width: adjustedWidth, height: calculatedHeight });
        } else {
          setImageSize({ width: containerWidth, height: calculatedHeight });
        }
      },
      (error) => {
        console.error("Failed to get image dimensions:", error);
      }
    );
  }, [image]);

  const handleSave = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "We need access to save your image.");
        return;
      }

      if (outputRef.current) {
        const uri = await captureRef(outputRef.current, {
          format: "png",
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Success", "Your image has been saved to Photos.");
      } else {
        Alert.alert("Error", "Unable to capture the view.");
      }
    } catch (error) {
      Alert.alert("Error", "There was an issue saving your image.");
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      if (outputRef.current) {
        const uri = await captureRef(outputRef.current, {
          format: "png",
          quality: 1,
        });

        await Share.share({
          title: "Check out this image!",
          message: caption,
          url: uri,
        });
      } else {
        Alert.alert("Error", "Unable to capture the view.");
      }
    } catch (error) {
      Alert.alert("Error", "There was an issue sharing your image.");
      console.error(error);
    }
  };

  const handleCopy = () => {
    Clipboard.setString(caption);
    Alert.alert("Copied!", "Caption text copied to clipboard.");
  };

  const handleNew = () => {
    navigation.navigate("ImageSelection");
  };

  return (
    <View style={styles.screenContainer}>
      <View ref={outputRef} collapsable={false} style={styles.captureContainer}>
        {/* Background Image */}
        <Image source={{ uri: image }} style={styles.backgroundImage} />

        <BlurView intensity={90} tint="dark" style={styles.blurOverlay} />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <View style={styles.foregroundContent}>
            <View style={[styles.imageShadowWrapper, { width: imageSize.width, height: imageSize.height }]}>
              <Image
                source={{ uri: image }}
                style={[
                  styles.foregroundImage,
                  { width: imageSize.width, height: imageSize.height },
                ]}
              />
            </View>
              <TouchableOpacity
              style={[styles.captionContainer, { width: imageSize.width }]}
              onPress={handleCopy}
              >
              <Text style={styles.caption}>{caption}</Text>
              <View style={styles.watermarkInsideCaption}>
                <DescribeMeLogo width={120} height={'32'} />
              </View>
              </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <IconButton
          title="Save"
          Icon={SaveIcon}
          onPress={handleSave}
          buttonStyle={styles.actionButton}
          textStyle={styles.actionText}
        />
        <IconButton
          title="Share"
          Icon={ShareIconSvg}
          onPress={handleShare}
          buttonStyle={styles.actionButton}
          textStyle={styles.actionText}
        />
        <IconButton
          title="New"
          Icon={NewFileIcon}
          onPress={handleNew}
          buttonStyle={styles.actionButton}
          textStyle={styles.actionText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  captureContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  foregroundContent: {
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowColor: colours.white,
    elevation: 5,
  },
  imageShadowWrapper: {
    // shadowColor: "white",
    // shadowOpacity: 1,
    // shadowRadius: 20,
    // shadowOffset: { width: 0, height: 0 },
    // borderRadius: 20, // To match the image's border radius
    // overflow: "hidden", // Ensures the image stays within the rounded corners
  },
  foregroundImage: {
    resizeMode: "contain",
    borderRadius: 20,
    marginBottom: 20,
  },
  captionContainer: {
    borderColor: colours.secondary,
    padding: "5%",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowColor: colours.white,
    elevation: 5,
  },
  caption: {
    fontSize: fontSizes.body.l,
    fontWeight: "600",
    color: colours.white,
    textAlign: "center",
  },
  watermarkInsideCaption: {
    marginTop: '6%', // Adjust spacing between caption and watermark
    alignItems: "center",
  },
  actionsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    color: colours.white,
  },
});