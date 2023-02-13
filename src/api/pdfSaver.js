import * as Print from "expo-print"
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export const createAndSavePDF = async (html) => {
  try {
    const { uri } = await Print.printToFileAsync({ html });
    if (Platform.OS === "ios") {
      await Sharing.shareAsync(uri);
      alert("Your File Has Been Saved SucccessFully")
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {
        await MediaLibrary.createAssetAsync(uri);
        alert("Your File Has Been Saved SucccessFully")
      }
    }

  } catch (error) {
    console.error(error);
  }
};