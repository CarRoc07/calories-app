import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'

const TodayCalories = ({total, consumed, calories, percentage}) => {

    return (
        <View style={styles.container}>
            <View style={styles.containerProgress}>
                <CircularProgress
                    value={percentage}
                    valueSuffix='%'
                />
            </View>
            <View style={styles.containerTextInfo}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Today</Text>
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.containerInfoItems}>
                        <Text style={styles.textItem}>Total</Text>
                        <Text style={styles.textItem}>{total}</Text>
                    </View>
                    <View style={styles.containerInfoItems}>
                        <Text style={styles.textItem}>Consumed</Text>
                        <Text style={styles.textItem}>{consumed}</Text>
                    </View>
                    <View style={styles.containerInfoItems}>
                        <Text style={styles.textItem}>Calories</Text>
                        <Text style={styles.textItem}>{calories}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        padding: 12
    },
    containerProgress: {
        alignItems: 'flex-start',
        flex: 1
    },
    containerTextInfo: {
        flex: 1
    },
    containerInfoItems: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 8,
    },
    textItem: {
        fontSize: 16,
    }
})

export default TodayCalories