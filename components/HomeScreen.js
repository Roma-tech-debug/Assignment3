import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 


const HomeScreen = () => {
  const navigation = useNavigation();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFact = async (selectedMonth, selectedDay) => {
    if (!selectedMonth || !selectedDay) return;
    setLoading(true);

    try {
      const options = {
        method: 'GET',
        url: `https://numbersapi.p.rapidapi.com/${selectedMonth}/${selectedDay}/date`,
        params: { json: true },
        headers: {
          'X-RapidAPI-Key': '1a6d8ef9bdmshd6967e4ee237f75p162235jsne53ca4b9e501', 
          'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      setFact(response.data.text);
    } catch (error) {
      console.error(error);
      setFact('Error fetching fact');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (month && day) {
      fetchFact(month, day);
    }
  }, [month, day]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Assignment-3</Text>
      </View>

      <Text style={styles.subtitle}>textInComponent</Text>

      {/* Dropdown */}
      <Picker
        selectedValue={month}
        onValueChange={(itemValue) => setMonth(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a month" value="" />
        <Picker.Item label="January" value="1" />
        <Picker.Item label="February" value="2" />
        <Picker.Item label="March" value="3" />
        <Picker.Item label="April" value="4" />
        <Picker.Item label="May" value="5" />
        <Picker.Item label="June" value="6" />
        <Picker.Item label="July" value="7" />
        <Picker.Item label="August" value="8" />
        <Picker.Item label="September" value="9" />
        <Picker.Item label="October" value="10" />
        <Picker.Item label="November" value="11" />
        <Picker.Item label="December" value="12" />
      </Picker>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Day (1-31)"
        value={day}
        onChangeText={setDay}
      />

      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <Text style={styles.fact}>{fact}</Text>
      )}
    </View>
  );
};
  
  const styles = StyleSheet.create({
    
  container: { flex: 1, padding: 22, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 60,
  },

  subtitle: { fontSize: 15, textAlign: 'left', marginBottom: 140},
  
  fact: {  fontSize: 16, color: '#333' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 3, marginBottom: 10,
  
  }
     
});
export default HomeScreen;


