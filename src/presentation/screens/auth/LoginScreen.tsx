
import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../navigation/StackNavigation";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {

  const {height } = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35 }}>
          <Text category="h1" >Ingresar</Text>
          <Text category="p2" >Por favor, ingreese para continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 20}}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock" />}
            style={{marginBottom: 10}}
          />

          <Layout style={{height: 20}} />

          <Layout>
            <Button
              accessoryRight={<MyIcon white name="arrow-forward-outline" />}
              onPress={() => console.log('Hola')}
            >
              Ingresar
            </Button>
          </Layout>

          {/* Información para crear cuenta */}

          <Layout style={{height: 50}} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'

          }}>
            <Text>¿No tienes cuenta?</Text>
            <Text 
              status="primary" 
              category="s1"
              onPress={() => navigation.navigate('RegisterScreen')}
            
            >
              {' '}Crea una{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>
    </Layout>
  )
}