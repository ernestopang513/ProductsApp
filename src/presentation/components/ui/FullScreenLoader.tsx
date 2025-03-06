
import { Layout, Spinner } from "@ui-kitten/components"
import { Text, View } from "react-native"



export const FullScreenLoader = () => {
  return (
    <Layout style = {{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 200,}}>
        <Spinner
            size="giant"
        />
    </Layout>
  )
}