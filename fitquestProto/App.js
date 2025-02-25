import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons

// Create individual screen components
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the FitQuest Home Page!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text>Your Workouts</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Your Profile</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text>Find Your Friends!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } 
            else if (route.name === 'Workouts') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } 
            else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            else if (route.name === 'Friends') {
              iconName = focused ? 'people-sharp' : 'people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF', // Color when tab is active
          tabBarInactiveTintColor: 'gray',  // Color when tab is inactive
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});