import { View, Text, TextInput, Pressable, ScrollView, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

export default function AdvancedBMIScreen() {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('male');
    const [isMetric, setIsMetric] = useState<boolean>(true);
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>('');
    const [color, setColor] = useState<string>('#fff');
    const [message, setMessage] = useState<string>('');
    const [idealWeight, setIdealWeight] = useState<string>('');
    const [bmr, setBmr] = useState<string>('');
    const [history, setHistory] = useState<any>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);

    const calculateBMI = () => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        const a = parseInt(age);

        if (!w || !h) {
            setBmi(null);
            setCategory('Please enter valid values');
            setColor('#ff5252');
            return;
        }

        // Convert to metric if imperial
        if (!isMetric) {
            w = w * 0.453592; // lbs to kg
            h = h * 2.54; // inches to cm
        }

        const heightM = h / 100;
        const bmiValue = w / (heightM * heightM);
        setBmi(bmiValue);

        // BMI Category
        let cat = '';
        let col = '';
        let msg = '';

        if (bmiValue < 18.5) {
            cat = 'Underweight';
            col = '#64b5f6';
            msg = 'Focus on nutrient-dense foods and strength training 💙';
        } else if (bmiValue < 25) {
            cat = 'Normal Weight';
            col = '#4caf50';
            msg = 'Excellent! Maintain with balanced diet & exercise 💪';
        } else if (bmiValue < 30) {
            cat = 'Overweight';
            col = '#ffa726';
            msg = 'Small lifestyle changes can make a big difference 🍎';
        } else {
            cat = 'Obese';
            col = '#ef5350';
            msg = 'Consider consulting a healthcare professional 🏥';
        }

        setCategory(cat);
        setColor(col);
        setMessage(msg);

        // Calculate ideal weight range (BMI 18.5-24.9)
        const minWeight = 18.5 * heightM * heightM;
        const maxWeight = 24.9 * heightM * heightM;
        const idealRange = isMetric
            ? `${minWeight.toFixed(1)}-${maxWeight.toFixed(1)} kg`
            : `${(minWeight * 2.20462).toFixed(1)}-${(maxWeight * 2.20462).toFixed(1)} lbs`;
        setIdealWeight(idealRange);

        // Calculate BMR (Basal Metabolic Rate)
        if (a) {
            let bmrValue;
            if (gender === 'male') {
                bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
            } else {
                bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
            }
            setBmr(`${Math.round(bmrValue)} cal/day`);
        }

        // Add to history
        const newEntry = {
            date: new Date().toLocaleDateString(),
            bmi: bmiValue.toFixed(1),
            weight: isMetric ? `${w.toFixed(1)} kg` : `${weight} lbs`,
            category: cat
        };
        setHistory(prev => [newEntry, ...prev.slice(0, 4)]);
    };

    const resetCalculator = () => {
        setWeight('');
        setHeight('');
        setAge('');
        setBmi(null);
        setCategory('');
        setMessage('');
        setIdealWeight('');
        setBmr('');
    };

    return (
        <ScrollView style={styles.container}>
            {/* Unit Toggle */}
            <View style={styles.unitToggle}>
                <Text style={styles.unitText}>Imperial</Text>
                <Switch
                    value={isMetric}
                    onValueChange={setIsMetric}
                    trackColor={{ false: '#767577', true: '#bb86fc' }}
                    thumbColor={isMetric ? '#fff' : '#f4f3f4'}
                />
                <Text style={styles.unitText}>Metric</Text>
            </View>

            {/* Input Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Enter Your Details</Text>

                {/* Gender Selection */}
                <View style={styles.genderContainer}>
                    <Pressable
                        style={[styles.genderBtn, gender === 'male' && styles.genderBtnActive]}
                        onPress={() => setGender('male')}
                    >
                        <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>
                            Male
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.genderBtn, gender === 'female' && styles.genderBtnActive]}
                        onPress={() => setGender('female')}
                    >
                        <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>
                            Female
                        </Text>
                    </Pressable>
                </View>

                <Text style={styles.label}>Weight ({isMetric ? 'kg' : 'lbs'})</Text>
                <TextInput
                    placeholder={isMetric ? "e.g. 70" : "e.g. 154"}
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                    style={styles.input}
                />

                <Text style={styles.label}>Height ({isMetric ? 'cm' : 'inches'})</Text>
                <TextInput
                    placeholder={isMetric ? "e.g. 175" : "e.g. 69"}
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                    style={styles.input}
                />

                <Text style={styles.label}>Age (optional)</Text>
                <TextInput
                    placeholder="e.g. 25"
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                    style={styles.input}
                />

                <View style={styles.buttonRow}>
                    <Pressable style={styles.button} onPress={calculateBMI}>
                        <Text style={styles.buttonText}>Calculate</Text>
                    </Pressable>
                    <Pressable style={styles.resetButton} onPress={resetCalculator}>
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </Pressable>
                </View>
            </View>

            {/* Results */}
            {bmi && (
                <>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Your BMI</Text>
                        <Text style={[styles.bmiValue, { color }]}>
                            {bmi.toFixed(1)}
                        </Text>
                        <Text style={[styles.category, { color }]}>
                            {category}
                        </Text>
                        <Text style={styles.message}>{message}</Text>

                        {/* BMI Scale */}
                        <View style={styles.scale}>
                            <View style={styles.scaleBar}>
                                <View style={[styles.scaleSection, { backgroundColor: '#64b5f6' }]} />
                                <View style={[styles.scaleSection, { backgroundColor: '#4caf50' }]} />
                                <View style={[styles.scaleSection, { backgroundColor: '#ffa726' }]} />
                                <View style={[styles.scaleSection, { backgroundColor: '#ef5350' }]} />
                            </View>
                            <View style={[styles.indicator, {
                                left: `${Math.min((bmi / 40) * 100, 95)}%`,
                                backgroundColor: color
                            }]} />
                        </View>
                        <View style={styles.scaleLabels}>
                            <Text style={styles.scaleLabel}>18.5</Text>
                            <Text style={styles.scaleLabel}>25</Text>
                            <Text style={styles.scaleLabel}>30</Text>
                            <Text style={styles.scaleLabel}>40</Text>
                        </View>
                    </View>

                    {/* Additional Info */}
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Ideal Weight Range</Text>
                            <Text style={styles.infoValue}>{idealWeight}</Text>
                        </View>
                        {bmr && (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Basal Metabolic Rate</Text>
                                <Text style={styles.infoValue}>{bmr}</Text>
                            </View>
                        )}
                    </View>

                    {/* Health Tips */}
                    <View style={styles.tipsCard}>
                        <Text style={styles.tipsTitle}>Health Recommendations</Text>
                        <View style={styles.tip}>
                            <Text style={styles.tipIcon}>🥗</Text>
                            <Text style={styles.tipText}>Eat a balanced diet with plenty of vegetables and lean proteins</Text>
                        </View>
                        <View style={styles.tip}>
                            <Text style={styles.tipIcon}>🏃</Text>
                            <Text style={styles.tipText}>Get at least 150 minutes of moderate exercise per week</Text>
                        </View>
                        <View style={styles.tip}>
                            <Text style={styles.tipIcon}>💧</Text>
                            <Text style={styles.tipText}>Stay hydrated with 8-10 glasses of water daily</Text>
                        </View>
                        <View style={styles.tip}>
                            <Text style={styles.tipIcon}>😴</Text>
                            <Text style={styles.tipText}>Aim for 7-9 hours of quality sleep each night</Text>
                        </View>
                    </View>
                </>
            )}

            {/* History */}
            {history.length > 0 && (
                <View style={styles.historyCard}>
                    <Pressable
                        style={styles.historyHeader}
                        onPress={() => setShowHistory(!showHistory)}
                    >
                        <Text style={styles.historyTitle}>History ({history.length})</Text>
                        <Text style={styles.arrow}>{showHistory ? '▼' : '▶'}</Text>
                    </Pressable>

                    {showHistory && history.map((entry, index) => (
                        <View key={index} style={styles.historyEntry}>
                            <View>
                                <Text style={styles.historyDate}>{entry.date}</Text>
                                <Text style={styles.historyCategory}>{entry.category}</Text>
                            </View>
                            <View style={styles.historyRight}>
                                <Text style={styles.historyBMI}>{entry.bmi}</Text>
                                <Text style={styles.historyWeight}>{entry.weight}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    unitToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
    },
    unitText: {
        color: '#bbb',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    genderBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
    },
    genderBtnActive: {
        backgroundColor: '#bb86fc',
    },
    genderText: {
        color: '#bbb',
        fontWeight: '600',
    },
    genderTextActive: {
        color: '#000',
    },
    label: {
        color: '#bbb',
        marginBottom: 6,
        marginTop: 12,
        fontSize: 13,
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 14,
        color: '#fff',
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    button: {
        flex: 2,
        backgroundColor: '#bb86fc',
        paddingVertical: 14,
        borderRadius: 30,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    resetButton: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        paddingVertical: 14,
        borderRadius: 30,
    },
    resetButtonText: {
        color: '#bbb',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    resultCard: {
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        padding: 24,
        borderRadius: 16,
        marginBottom: 20,
    },
    resultLabel: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 8,
    },
    bmiValue: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 6,
    },
    message: {
        color: '#ccc',
        textAlign: 'center',
        marginTop: 12,
        fontSize: 14,
    },
    scale: {
        width: '100%',
        marginTop: 24,
        position: 'relative',
    },
    scaleBar: {
        flexDirection: 'row',
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    scaleSection: {
        flex: 1,
    },
    indicator: {
        position: 'absolute',
        top: -6,
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#1e1e1e',
    },
    scaleLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 4,
    },
    scaleLabel: {
        color: '#777',
        fontSize: 11,
    },
    infoCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
    },
    infoLabel: {
        color: '#bbb',
        fontSize: 14,
    },
    infoValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    tipsCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    tip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 14,
    },
    tipIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    tipText: {
        flex: 1,
        color: '#ccc',
        fontSize: 13,
        lineHeight: 20,
    },
    historyCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    arrow: {
        color: '#bbb',
        fontSize: 14,
    },
    historyEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#2a2a2a',
    },
    historyDate: {
        color: '#bbb',
        fontSize: 12,
        marginBottom: 4,
    },
    historyCategory: {
        color: '#fff',
        fontSize: 14,
    },
    historyRight: {
        alignItems: 'flex-end',
    },
    historyBMI: {
        color: '#bb86fc',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    historyWeight: {
        color: '#bbb',
        fontSize: 12,
    },
});