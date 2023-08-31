import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import CardFood from './CardFood'

const SectionFoodToday = ({ food, onComplete }) => {
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#fff', padding: 12}}>
                <Text style={styles.title}>Today's Food</Text>
            </View>
            <ScrollView style={styles.containerFood}>
                {
                    food.map((food, index) => (
                        <CardFood key={index} {...food} onComplete={onComplete} index={index} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        borderRadius: 16,
        marginBottom: 12
    },
    containerFood: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginLeft: -12,
        fontWeight: '500'
    }
})

export default SectionFoodToday