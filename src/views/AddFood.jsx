import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import { Button, Icon } from '@rneui/themed'
import { Input } from '@rneui/base'
import AddFoodModal from '../components/AddFoodModal'
import useFoodStorage from '../hooks/useFoodStorage'
import CardFood from '../components/CardFood'

const AddFood = () => {
    const [visible, setVisible] = useState(false)
    const [foods, setFoods] = useState([])
    const [search, setSearch] = useState('')    
    const { onGetFood } = useFoodStorage()

    const loadFoods = async () => {
        try {
            const foodResponse = await onGetFood()
            setFoods(foodResponse)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClose = async (update = false) => {
        if(update) {
            Alert.alert('Food Save')
            loadFoods()
        }
        setVisible(false)
    }

    const handleSubmit = async (value) => {
        try {
            const result = await onGetFood()
            setFoods(result.filter((food) => food.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
        } catch (error) {
            console.log(error)
            setFoods([])
        }
    }

    useEffect(() => {
        loadFoods()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerSubHeader}>
                <Text style={styles.textAddfood}>Add Food</Text>
                <Button icon={<Icon name="add-circle-outline" color='#fff' />} radius='md' color='#4ecb71' onPress={() => setVisible(true)}/>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Input placeholder='Food name ...' value={search} onChangeText={(text) => setSearch(text.trim())} />
                </View>
                <View>
                    <Button title='Search' color='#5BDC7F' radius='lg' titleStyle={{color: '#000'}} onPress={() => handleSubmit(search)} />
                </View>
            </View>
            <ScrollView style={styles.containerFoods}>
                {
                    foods.map((food, index) => (
                        <CardFood key={index} {...food} isOkToAdd onComplete={() => {}} index={index} />
                    ))
                }
            </ScrollView>
            <AddFoodModal visible={visible} onClose={handleModalClose} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerSubHeader: {
        backgroundColor: '#fff',
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textAddfood: {
        fontSize: 22,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 12
    },
    inputContainer: {
        flex: 1,
        marginLeft: -10
    },
    containerFoods: {
        flexDirection: 'column',
        padding: 12
    }
})

export default AddFood