import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ToxicityCriteriaPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report: Criteria for Classifying Material Toxicity</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.paragraph}>
        This report defines the criteria used to classify materials into three categories based on their potential harm to human health and the environment.
        The classification system helps quickly identify risks associated with material use, particularly in food-related applications (packaging, containers, etc.).
      </Text>

      <Text style={styles.sectionTitle}>2. Classification Criteria</Text>
      <Text style={styles.paragraph}>The classification is based on key scientific factors:</Text>

      <Text style={styles.subSection}>A. Key Factors</Text>
      <Text style={styles.listItem}>1. <Text style={styles.bold}>Chemical Leaching</Text></Text>
      <Text style={styles.bullet}>• Risk of toxic substance release (phthalates, BPA, heavy metals, antimony, etc.).</Text>
      <Text style={styles.bullet}>• Interaction with food (heat, acidity, contact duration).</Text>

      <Text style={styles.listItem}>2. <Text style={styles.bold}>Toxicity of Components</Text></Text>
      <Text style={styles.bullet}>• Presence of endocrine disruptors (BPA, phthalates).</Text>
      <Text style={styles.bullet}>• Neurotoxicity (lead, cadmium).</Text>
      <Text style={styles.bullet}>• Carcinogenicity or reproductive effects.</Text>

      <Text style={styles.listItem}>3. <Text style={styles.bold}>Thermal and Mechanical Stability</Text></Text>
      <Text style={styles.bullet}>• Heat resistance (risk of degradation and toxin release).</Text>
      <Text style={styles.bullet}>• Risk of microcracks or physical wear.</Text>

      <Text style={styles.listItem}>4. <Text style={styles.bold}>Environmental Impact</Text></Text>
      <Text style={styles.bullet}>• Biodegradability.</Text>
      <Text style={styles.bullet}>• Microplastic persistence.</Text>
      <Text style={styles.bullet}>• Recyclability.</Text>

      <Text style={styles.subSection}>B. Classification Levels</Text>
      <Text style={styles.paragraph}>
        1. <Text style={styles.green}>Green</Text>: Safe, Non-toxic, No significant concerns. {'\n'}
        2. <Text style={styles.orange}>Orange</Text>: Moderately harmful, Warning, Use with caution. {'\n'}
        3. <Text style={styles.red}>Red</Text>: Dangerous, Toxic, Avoid use.
      </Text>

      <Text style={styles.subSection}>C. Examples of Material Classification</Text>
      <Text style={styles.paragraph}>
        • HDPE: Green – Stable, low chemical leaching, recyclable. {'\n'}
        • PET (single use): Green – Safe for single-use. {'\n'}
        • PET (reused/heated): Orange – Possible antimony and phthalate release. {'\n'}
        • TRITAN: Green – BPA-free, heat-resistant. {'\n'}
        • Borosilicate glass: Green – Chemically inert. {'\n'}
        • Soda-lime glass: Orange – Possible trace metals, lower heat resistance. {'\n'}
        • Lead crystal: Red – Neurotoxic, leaches into drinks. {'\n'}
        • PVC: Red – Releases phthalates and vinyl chloride.
      </Text>

      <Text style={styles.subSection}>Recommendations</Text>
      <Text style={styles.bullet}>• Prefer <Text style={styles.green}>Green materials</Text> (HDPE, TRITAN, borosilicate glass) for food contact.</Text>
      <Text style={styles.bullet}>• Limit use of <Text style={styles.orange}>Orange materials</Text> (reused PET, soda-lime glass).</Text>
      <Text style={styles.bullet}>• Strictly avoid <Text style={styles.red}>Red materials</Text> (lead crystal, PVC) in food/drink applications.</Text>

    </ScrollView>
  );
};

export default ToxicityCriteriaPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subSection: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  paragraph: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold'
  },
  bullet: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  green: {
    color: '#34A853',
    fontWeight: 'bold'
  },
  orange: {
    color: '#FB8C00',
    fontWeight: 'bold'
  },
  red: {
    color: '#EA4335',
    fontWeight: 'bold'
  },
});
