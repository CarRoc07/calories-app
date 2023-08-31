import AsyncStorage from '@react-native-async-storage/async-storage';
import { isToday } from 'date-fns';

const KEY_FOOD = '@Food:key'
const KEY_TODAY = '@Today:key'

const useFoodStorage = () => {
    const saveFood = async ({calories, name, portion}) => {
        try {
            const food = await AsyncStorage.getItem(KEY_FOOD)

            if(food !== null) {
                const foodParsed = JSON.parse(food)
                foodParsed.push({
                    calories,
                    name,
                    portion
                })
                await AsyncStorage.setItem(KEY_FOOD, JSON.stringify(foodParsed))

                return Promise.resolve()
            }

            await AsyncStorage.setItem(KEY_FOOD, JSON.stringify([{
                calories,
                name,
                portion
            }]))

            return Promise.resolve()

        } catch (error) {
            return Promise.reject(error)
        }
    }

    const getFood = async () => {
        try {
            const food = await AsyncStorage.getItem(KEY_FOOD)
            return food !== null ? JSON.parse(food) : []
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const saveTodayFood = async ({calories, name, portion}) => {
        try {
            const food = await AsyncStorage.getItem(KEY_TODAY)

            if(food !== null) {
                const foodParsed = JSON.parse(food)
                foodParsed.push({
                    calories,
                    name,
                    portion,
                    date: new Date().toISOString()
                })
                await AsyncStorage.setItem(KEY_TODAY, JSON.stringify(foodParsed))

                return Promise.resolve()
            }

            await AsyncStorage.setItem(KEY_TODAY, JSON.stringify([{
                calories,
                name,
                portion,
                date: new Date().toISOString()
            }]))

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const getTodayFood = async () => {
        try {
            const food = await AsyncStorage.getItem(KEY_TODAY)
            console.log(food)
            if(food !== null) {
                const foodParsed = JSON.parse(food)
                return foodParsed.filter(item => item.date && isToday(new Date(item.date)))
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const removeTodayFood = async (index) => {
        try {
            const todayFood = await getTodayFood()
            const filteredItems = todayFood.filter((item, i) => i !== index)
            await AsyncStorage.setItem(KEY_TODAY, JSON.stringify(filteredItems))

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }


    return {
        onSaveFood: saveFood,
        onGetFood: getFood,
        onSaveTodayFood: saveTodayFood,
        onGetTodayFood: getTodayFood,
        onDeleteTodayFood: removeTodayFood
    }
}

export default useFoodStorage