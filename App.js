import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  SafeAreaView,
} from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log('Here are all your calendars:');
        console.log({ calendars });
        // console.log(Calendar);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title='Create a new calendar' onPress={createCalendar} />
    </SafeAreaView>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();

  console.log(defaultCalendar);
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'test Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  getEvents();
}

async function getEvents() {
  let cal = await Calendar.getCalendarsAsync();
  console.log(cal);
  // let events = Calendar.getEventAsync();
  // console.log(events);
}

const styles = StyleSheet.create({});
