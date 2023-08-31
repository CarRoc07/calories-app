import { Button, Icon } from '@rneui/themed'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import useFoodStorage from '../hooks/useFoodStorage'

const CardFood = ({name, calories, portion, isOkToAdd, onComplete, index}) => {
    const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage()

    const handleIconPress = async () => {
        try {
            if(isOkToAdd) {
                await onSaveTodayFood({name, calories, portion})
                Alert.alert('Food added successfully')
            } else {
                await onDeleteTodayFood(index)
                Alert.alert('Food deleted successfully')
            }

            onComplete()
        } catch (error) {
            console.log(error)
            Alert.alert('Error adding food')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.textPortion}>{portion}g</Text>
            </View>
            <View style={styles.rightContainer}>
                <Button icon={<Icon name={isOkToAdd ? "add-circle-outline" : "close"} color='#000' size={24} />} onPress={handleIconPress} radius='md' type='clear'  />
                <Text style={styles.textCal}>{calories} kcal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#5BDC7F',
        borderRadius: 16,
        marginBottom: 12
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    textName: {
        fontWeight: '800',
        fontSize: 20,
    },
    textPortion: {
        fontSize: 16,
        opacity: .6,
        fontWeight: '500'
    },
    textCal: {
        fontSize: 18,
    }
})
export default CardFood