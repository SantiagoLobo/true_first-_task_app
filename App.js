import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import React, { useState } from 'react';

import Checkbox from 'expo-checkbox';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  

  


  const onHandlerChange = (text) => {
    setTask(text)
  }

  const onHandlerSubmit = () => {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        value: task
      }
    ]);
    setTask('');
  }

  const onHandlerModal = (item) => {
    setIsModalVisible(!isModalVisible)
    setSelectedTask(item);
  }

  const renderItem = ({ item }) => {
  
    const [isChecked, setChecked] = useState(false);
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => onHandlerModal(item)}>
           <Text style={styles.itemList}>{item.value}</Text>       
          <Checkbox
               style={styles.checkbox}
               value={isChecked}
               onValueChange={setChecked}
               color={isChecked ? '#4630EB' : undefined}
             />
         </TouchableOpacity>
      </View>
     )
    
  }
  const onHandleCancel = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedTask(null);
  }

  const onHandleDelete = () => {
    setTasks((prevTaskList) => prevTaskList.filter((task) => task.id !== selectedTask.id));
    setIsModalVisible(!isModalVisible);
  }


  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='add a new task' 
          autoComplete='off'
          autoCorrect={false}
          autoCapitalize='none'
          value={task}
          onChangeText={onHandlerChange}
        />
        <Button disabled={!task} title='Add' color='#626893' onPress={onHandlerSubmit} />
      </View>
      <FlatList 
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.listContainer}
      />
      <Modal visible={isModalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Task Detail</Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalDetailMessage}>Are you sure to delete this item?</Text>
            <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button 
              title='Cancel'
              color='#626893'
              onPress={onHandleCancel}
            />
            <Button
              title='Delete'
              color='red'
              onPress={onHandleDelete}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50 ,
    marginHorizontal: 15,
  },
  input: {
    width: '75%',
    borderBottomColor: '#626893',
    borderBottomWidth: 1,
    height: 40,
    color: '#212121'
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#626893',
    marginBottom: 10,
    borderRadius: 10,
  },
  itemList: {
    fontSize: 14,
    width: '75%',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetailContainer: {
    padddingVertical: 20,
  },
  modalDetailMessage: {
    fontSize: 14,
    color: '#212121'
  },
  selectedTask: {
    fontSize: 14,
    color: '#212121',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  checkbox: {
    margin: 8,
  },
});