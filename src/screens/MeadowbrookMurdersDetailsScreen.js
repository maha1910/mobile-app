import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const meadowbrookCover = require('../../assets/meadowbrook-murders-cover.jpg');

const MeadowbrookMurdersDetails = () => {
  const navigation = useNavigation();
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('book_reviews')
        .select('rating')
        .eq('book_name', 'The Meadowbrook Murders');

      if (error) {
        console.error('Error fetching average rating:', error);
        setLoading(false);
        return;
      }

      const totalRatings = data.length;
      const sumRatings = data.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRatings ? (sumRatings / totalRatings).toFixed(1) : 'No ratings yet';

      setAverageRating(avgRating);
      setLoading(false);
    };

    fetchAverageRating();
  }, []);

  return (
    <LinearGradient
      colors={['#F2AA4CFF', '#101820FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={meadowbrookCover} style={styles.bookCover} />

        <Text style={styles.title}>The Meadowbrook Murders</Text>
        <Text style={styles.author}>Author: Jessica Goodman</Text>
        <Text style={styles.year}>📅 Published: 2024</Text>
        <Text style={styles.pages}>📖 Pages: 350</Text>

        <Text style={styles.sectionTitle}>📜 Summary:</Text>
        <Text style={styles.description}>
          *The Meadowbrook Murders* is a thrilling mystery novel that unravels a series of unsolved crimes 
          in a quiet suburban town. Detective Harper Reed must piece together clues hidden within the town’s 
          darkest secrets before the murderer strikes again.
        </Text>

        <Text style={styles.sectionTitle}>✨ Key Themes:</Text>
        <Text style={styles.description}>
          • Mystery & Investigation{"\n"}
          • Secrets & Lies{"\n"}
          • Small-Town Suspense
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.sectionTitle}>⭐ Rating:</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#FFD700" />
          ) : (
            <Text style={styles.rating}>{averageRating} / 5</Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('BookReviews', { bookName: 'The Meadowbrook Murders' })}>
            <Text style={styles.seeReviews}>See Reviews</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  bookCover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  year: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  pages: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#f5f5f5',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  seeReviews: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00CED1',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeadowbrookMurdersDetails;
