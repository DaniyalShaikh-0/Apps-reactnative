import {format} from 'date-fns';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';

const categories = [
  'Food',
  'Gift',
  'Petrol',
  'Drink',
  'Snacks',
  'Dessert',
  'Shopping',
  'Mechanic',
  'Mobile',
  'Bills',
  'Car',
  'Entertainment',
  'Medical',
  'Others',
];
const MyModal = ({isVisible, onClose, handleSave}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [expenseDateTime, setExpenseDateTime] = useState(new Date());
  const [dateTimeOpen, setDateTimeOpen] = useState(false);
  const handleClear = () => {
    setInput1('');
    setInput2('');
    setSelectedCat('');
  };
  const onChange = (event: any) => {
    console.log('============EVE========================');
    console.log(event);
    console.log('============EVE========================');
  };
  const [selectDate, selectTime] = useMemo(
    () => format(expenseDateTime, 'dd MMM yyyy|hh:mm a').split('|'),
    [expenseDateTime],
  );
  useEffect(() => {
    if (isVisible) setExpenseDateTime(new Date());
    return () => {};
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <StatusBar backgroundColor={'#0008'} animated />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'black',
                flex: 1,
                marginLeft: 30,
              }}>
              Add Expense
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" color={'black'} size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 0,
              },
            ]}>
            <View
              style={{
                height: '100%',
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: '#E8EFE9',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {selectDate}
                </Text>
              </View>
              <View
                style={{height: '100%', width: 2, backgroundColor: 'black'}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: '#E3E7ED',
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {selectTime}
                </Text>
              </View>

              {/* <FlatList
                horizontal
                data={}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: 'lightgrey',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 3,
                      // borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {item}
                    </Text>
                  </View>
                )}
                contentContainerStyle={{
                  width: '100%',
                  justifyContent: 'space-around',
                  // alignItems: 'center',
                }}
                style={{width: '100%', height: '100%', backgroundColor: 'red'}}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 40,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              /> */}
            </View>
            <View
              style={{height: '100%', width: 2, backgroundColor: 'black'}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 8,
                flex: 0.3,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setDateTimeOpen(true);
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#247DDC',
                  fontWeight: '900',
                  textAlign: 'center',
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="How much did you spend?"
            placeholderTextColor="#888888"
            value={input1}
            keyboardType="numeric"
            onChangeText={text => setInput1(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Where did you spend?"
            placeholderTextColor="#888888"
            value={input2}
            onChangeText={text => setInput2(text)}
          />
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                onPress={() => setSelectedCat(category)}
                activeOpacity={0.7}
                key={index}
                style={[
                  styles.categoryTile,
                  category === selectedCat ? {backgroundColor: 'grey'} : {},
                ]}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            title="Save"
            onPress={() => {
              Promise.resolve()
                .then(
                  handleSave?.bind(
                    this,
                    input1,
                    input2,
                    selectedCat,
                    expenseDateTime,
                  ),
                )
                .then(handleClear);
            }}
          />
          <DatePicker
            modal
            open={dateTimeOpen}
            date={expenseDateTime}
            onConfirm={date => {
              // console.log(date);
              setDateTimeOpen(false);
              setExpenseDateTime(date);
            }}
            onCancel={() => {
              setDateTimeOpen(false);
            }}
            maximumDate={new Date()}
            androidVariant="iosClone"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0008',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black', // Text color is black
  },
  closeButton: {
    // position: 'absolute',
    // top: -10, // Move the close button up
    // right: 10,
    // padding: 10,
    marginLeft: 'auto',
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Close button text color is black
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignContent: 'center',
    justifyContent: 'center',
  },
  categoryTile: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: 'black',
  },
});

export default MyModal;
