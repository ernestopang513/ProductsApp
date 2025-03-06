
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { StyleProp, Text, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authLogin } from '../../accions/auth/auth';
import { useNavigation } from "@react-navigation/native";
import { MyIcon } from "../components/ui/MyIcon";

interface Props {
    title: string;
    subTitle?: string;

    rightAction?: () => void;
    rightActionIcon?: string;

    children: React.ReactNode;

    styles?: StyleProp<ViewStyle>


}

export const MainLayout = ({ 
    title, 
    subTitle, 
    children, 
    rightAction, 
    rightActionIcon,
    styles, 
}: Props) => {

    const {top} = useSafeAreaInsets();
    const {canGoBack, goBack} = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<MyIcon name="arrow-back-outline"/>}
            onPress={goBack}
        />
    )

    const RenderRightAction = () => {
        if(rightAction === undefined || rightActionIcon === undefined) return null;

        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<MyIcon name={rightActionIcon} />}
            />
        )
    }

    return (
        <Layout style={[ {padding: top, flex: 1}]}>
            <TopNavigation
                title={title}
                subtitle={subTitle}
                alignment="center"
                accessoryLeft={ canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction/>}
            />
            <Divider/>
            <Layout style={{flex: 1}}>
            {children}
            </Layout>
        </Layout>
    )
}