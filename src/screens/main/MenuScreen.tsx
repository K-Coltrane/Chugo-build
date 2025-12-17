import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuModal from "../../components/MenuModal";

/**
 * A dedicated route that shows the Menu as a modal overlay.
 * This makes the bottom-nav "Menu" action reliable across screens.
 */
const MenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MenuModal
        visible
        onClose={() => {
          if ((navigation as any).canGoBack?.()) (navigation as any).goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Underlay; MenuModal is a native Modal so this won't be seen, but keeps React happy.
  container: { flex: 1, backgroundColor: "transparent" },
});

export default MenuScreen;


