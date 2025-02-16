
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { StackNavigation } from "./presentation/navigation/StackNavigation"
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import './presentation/navigation/gesture-handler'
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { useColorScheme, View } from "react-native";

export const ProductsApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light
  const backgroundColor = (colorScheme === 'dark')
    ? theme['color-basic-800']
    : theme['color-basic-100']

  return (

    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva} theme={theme}
      >
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>

          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </View>
      </ApplicationProvider>
    </>
  )
}