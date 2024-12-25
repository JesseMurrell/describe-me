export type RootStackParamList = {
  ImageSelection: undefined;
  ImagePicker: { selectedImage: string | null }; // We'll pass the selected image URI here
  Results: { image: string; generation: string; tone: string };
  // ... any other routes
};