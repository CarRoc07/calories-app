import { Button, Icon, Input } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Modal, Text } from 'react-native'
import useFoodStorage from '../hooks/useFoodStorage'

const AddFoodModal = ({ onClose, visible }) => {
    const [dataForm, setDataForm] = useState({
        calories: '',
        name: '',
        portion: ''
    })

    const { onSaveFood } = useFoodStorage()

    useEffect(() => {
        setDataForm({
            calories: '',
            name: '',
            portion: ''
        })
    }, [visible])

    const handleSaveData = async () => {
        try {
            await onSaveFood(dataForm)

            onClose(true)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType='fade'>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button icon={<Icon name="close" color='#000' size={30} />} onPress={() => onClose()} type='clear' />
                    </View>
                    <Text>Add Food</Text>
                    <View style={styles.containerFormItem}>
                        <View style={styles.containerInput}>
                            <Input placeholder='Calorias' value={dataForm.calories} onChangeText={(text) => setDataForm({ ...dataForm, calories: text })} />
                        </View>
                        <View style={styles.containerText}>
                            <Text style={styles.legend}>KCAL</Text>
                        </View>
                    </View>
                    <View style={styles.containerFormItem}>
                        <View style={styles.containerInput}>
                            <Input placeholder='Nombre' value={dataForm.name} onChangeText={(text) => setDataForm({ ...dataForm, name: text })} />
                        </View>
                        <View style={styles.containerText}>
                            <Text style={styles.legend}>NOMBRE</Text>
                        </View>
                    </View>
                    <View style={styles.containerFormItem}>
                        <View style={styles.containerInput}>
                            <Input placeholder='Gramos' value={dataForm.portion} onChangeText={(text) => setDataForm({ ...dataForm, portion: text })} />
                        </View>
                        <View style={styles.containerText}>
                            <Text style={styles.legend}>PORCION</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button 
                        title='Add' 
                        icon={<Icon name="add" color='#fff' size={20}  />} 
                        disabled={!dataForm.calories.trim() || !dataForm.name.trim() || !dataForm.portion.trim()}
                        onPress={handleSaveData}
                        color='#4ecb71' type='solid' radius='lg' />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    content: {
        width: '70%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    containerFormItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerInput: {
        flex: 2,
    },
    containerText: {
        flex: 1,
    },
    legend: {
        fontWeight: '500'
    }
})

export default AddFoodModal