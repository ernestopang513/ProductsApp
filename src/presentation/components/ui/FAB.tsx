
import { Button } from "@ui-kitten/components"
import { StyleProp, Text, View, ViewStyle } from "react-native"
import { MyIcon } from "./MyIcon"

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;

}


export const FAB = ({style, iconName, onPress}: Props) => {
  return (
    <Button

      style = {[style, {
        // backgroundColor: 'transparent',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
        borderRadius:  9,
      }]}
      accessoryLeft={<MyIcon name = {iconName} white />}
      onPress={onPress}
    />
  )
}