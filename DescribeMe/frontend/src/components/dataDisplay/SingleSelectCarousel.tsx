// DescribeMe/frontend/src/components/dataDisplay/SingleSelectCarousel.tsx
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colours } from "@/theme/colours";
import { fontSizes } from "@/theme/sizing";
// We'll import the SelectionButton to highlight selected items
import { SelectionButton } from "@/components/inputs/buttons/SelectionButton";

interface SingleSelectCarouselProps {
  header?: string;
  data: string[];
  selectedValue?: string;     // new prop
  onSelect?: (value: string) => void; // new prop
}

export const SingleSelectCarousel: React.FC<SingleSelectCarouselProps> = ({
  header,
  data,
  selectedValue,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {header && <Text style={styles.header}>{header}</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {data.map((item, index) => {
          const isSelected = item === selectedValue;
          return (
            <View key={index} style={styles.itemWrapper}>
              <SelectionButton
                title={item}
                selected={isSelected}
                onPress={() => onSelect?.(item)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    fontSize: fontSizes.headings.h6,
    paddingTop: 10,
    paddingBottom: 2,
    fontWeight: "bold",
    color: colours.white,
    marginLeft: 16,
  },
  contentContainer: {
    marginTop: 8,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  itemWrapper: {
    marginRight: 22,
    width: '22%',
    marginBottom: 10,
  },
});
