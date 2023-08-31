import { useCallback, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import { Button, Icon } from '@rneui/themed'
import useFoodStorage from '../hooks/useFoodStorage'
import TodayCalories from '../components/TodayCalories'
import SectionFoodToday from '../components/SectionFoodToday'

const Home = () => {
    const [todayFood, setTodayFood] = useState([])
    const [statistics, setStatistics] = useState({
        total: 2000,
        consumed: 0,
        calories: 0,
        percentage: 0
    })
    const { navigate } = useNavigation()
    const { onGetTodayFood } = useFoodStorage()

    const calculateStatistics = (result) => {
        const consumed = result.reduce((acc, item) => {
            return acc + Number(item.calories)
        }, 0);
        const caloriesRemaining = 2000 - consumed;
        const percentage = (consumed / 2000) * 100;
        setStatistics({
            total: 2000,
            consumed: consumed,
            calories: caloriesRemaining,
            percentage: percentage
        })
    }

    const loadTodayFood = useCallback(async () => {
        try {
            const result = await onGetTodayFood()
            calculateStatistics(result)
            setTodayFood(result)
        } catch (error) {
            console.log(error)
            setTodayFood([])
        }
    }, [])

    useFocusEffect(useCallback(() => {
        loadTodayFood()
    }, [loadTodayFood]))

    const handleRedirectPress = () => {
        navigate('AddFood')
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerSubHeader}>
                <Text style={styles.textCalories}>Calories</Text>
                <Button icon={<Icon name="add-circle-outline" color='#fff' />} radius='md' color='#4ecb71' onPress={handleRedirectPress} />
            </View>
            <TodayCalories {...statistics} />
            <SectionFoodToday food={todayFood} onComplete={() => loadTodayFood()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    containerSubHeader: {
        backgroundColor: '#fff',
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textCalories: {
        fontSize: 24,
    }
})

export default Home