import React from "react"
import { View, Text } from "react-native"

interface TagProps {
    label: string
}
const RotateBackground: React.FC<TagProps> = ({ label }) => {
    return (
        <View>
            <Text>{label}</Text>
        </View>
)};

export default RotateBackground