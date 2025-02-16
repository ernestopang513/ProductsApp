
import { NavigationContainer } from "@react-navigation/native"
import { StackNavigation } from "./presentation/navigation/StackNavigation"
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import './presentation/navigation/gesture-handler'
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { useColorScheme } from "react-native";

export const ProductsApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light


  return (

    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva} theme={theme}
      >

    <NavigationContainer>
        <StackNavigation/>
    </NavigationContainer>
    </ApplicationProvider>
      </>
  )
}