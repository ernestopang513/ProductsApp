
import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../navigation/StackNavigation";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {

  const {height } = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.30 }}>
          <Text category="h1" >Crear cuenta</Text>
          <Text category="p2" >Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
         
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 20}}
          />
         
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
              Crear
            </Button>
          </Layout>

          {/* Información para crear cuenta */}

          <Layout style={{height: 50}} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'

          }}>
            <Text>¿Ya tienes cuenta?</Text>
            <Text 
              status="primary" 
              category="s1"
              onPress={() => navigation.goBack()}
            
            >
              {' '}Ingresa{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>
    </Layout>
  )
}